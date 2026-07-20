#!/usr/bin/env bash

set -uo pipefail

PROJECT_HARNESS_VERSION="1.2.0"
BASELINE_FORMAT_VERSION="1"

ROOT="$(pwd)"
NO_GIT=0
failures=0
warnings=0

usage() {
  printf 'Usage: bash scripts/project-check.sh [--no-git]\n'
}

for arg in "$@"; do
  case "$arg" in
    --no-git) NO_GIT=1 ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      exit 2
      ;;
  esac
done

trim() {
  printf '%s' "$1" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'
}

info() {
  printf 'INFO: %s\n' "$1"
}

warn() {
  warnings=$((warnings + 1))
  printf 'WARN: %s\n' "$1"
}

fail() {
  failures=$((failures + 1))
  printf 'FAIL: %s\n' "$1"
}

contains_literal() {
  grep -Fq -- "$2" "$1" 2>/dev/null
}

contains_any() {
  file="$1"
  shift
  for item in "$@"; do
    contains_literal "$file" "$item" && return 0
  done
  return 1
}

frontmatter_value() {
  file="$1"
  key="$2"
  awk -v key="$key" '
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter == 1 && $0 == "---" { exit }
    in_frontmatter == 1 {
      line = $0
      prefix = key ":"
      if (index(line, prefix) == 1) {
        sub(/^[^:]+:[[:space:]]*/, "", line)
        print line
        exit
      }
    }
  ' "$file"
}

adapter_has_copied_rules() {
  adapter="$1"
  canonical="$2"
  awk -v canonical_path="$canonical" '
    FNR == NR { canonical_line[$0] = 1; next }
    FNR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter == 1 {
      if ($0 == "---") in_frontmatter = 2
      next
    }
    $0 == "" || index($0, canonical_path) || length($0) < 10 { next }
    canonical_line[$0] { copied = 1 }
    END { exit copied ? 0 : 1 }
  ' "$canonical" "$adapter"
}

extract_backticked_path() {
  printf '%s' "$1" | sed -n 's/^[^`]*`\([^`]*\)`.*/\1/p'
}

asset_is_nonempty() {
  path="$1"
  if [ -f "$path" ]; then
    [ -s "$path" ]
  elif [ -d "$path" ]; then
    [ -n "$(find "$path" -mindepth 1 -print -quit 2>/dev/null)" ]
  else
    return 1
  fi
}

check_agents() {
  fix=".agents/core/templates/project-agents-template.md"

  if [ ! -f AGENTS.md ]; then
    fail "AGENTS.md is missing (fix: see $fix)"
    return
  fi

  contains_literal AGENTS.md ".agents/" || fail "AGENTS.md missing .agents/ reference (fix: see $fix)"
  contains_literal AGENTS.md "docs/workspace-baseline.md" || fail "AGENTS.md missing workspace baseline reference (fix: see $fix)"
  contains_literal AGENTS.md "bash scripts/project-check.sh" || fail "AGENTS.md missing project-check closing command (fix: see $fix)"
}

check_baseline_required_fields() {
  baseline="docs/workspace-baseline.md"
  fix=".agents/core/templates/workspace-baseline-template.md"

  if [ ! -f "$baseline" ]; then
    fail "docs/workspace-baseline.md is missing (fix: see $fix)"
    return
  fi

  contains_any "$baseline" "Workspace version" "Workspace 版本" || fail "baseline missing Workspace version (fix: see $fix)"
  contains_literal "$baseline" "Copied assets" || fail "baseline missing Copied assets section (fix: see $fix)"
  contains_any "$baseline" "Reference-only assets" "Pointer-only references" || fail "baseline missing reference-only assets section (fix: see $fix)"
  contains_literal "$baseline" "Not imported" || fail "baseline missing Not imported classification (fix: see $fix)"
  contains_literal "$baseline" "Domain Mapping" || fail "baseline missing Domain Mapping (fix: see $fix)"
  contains_literal "$baseline" "Fallback behavior" || fail "baseline missing Fallback behavior (fix: see $fix)"
  contains_literal "$baseline" "Project harness version" || fail "baseline missing Project harness version (fix: see $fix)"
  contains_literal "$baseline" "Codex native adapters" || fail "baseline missing Codex native adapters status (fix: see $fix)"
  contains_literal "$baseline" "Claude project-native entry" || fail "baseline missing Claude project-native entry status (fix: see $fix)"
  contains_literal "$baseline" "Claude native adapters" || fail "baseline missing Claude native adapters status (fix: see $fix)"
  contains_literal "$baseline" "Claude runtime verification" || fail "baseline missing Claude runtime verification status (fix: see $fix)"
}

check_copied_assets() {
  baseline="docs/workspace-baseline.md"
  fix=".agents/core/templates/workspace-baseline-template.md"
  begin="<!-- copied-assets:BEGIN format=$BASELINE_FORMAT_VERSION -->"
  end="<!-- copied-assets:END -->"

  [ -f "$baseline" ] || return

  if ! contains_literal "$baseline" "$begin" || ! contains_literal "$baseline" "$end"; then
    fail "baseline copied-assets marker is missing (fix: see $fix)"
    return
  fi

  in_marker=0
  while IFS= read -r line || [ -n "$line" ]; do
    if [ "$line" = "$begin" ]; then
      in_marker=1
      continue
    fi
    if [ "$line" = "$end" ]; then
      in_marker=0
      continue
    fi
    [ "$in_marker" -eq 1 ] || continue
    case "$line" in
      "|"*) ;;
      *) continue ;;
    esac

    IFS='|' read -r _ source_col path_col category_col status_col rest <<EOF_ROW
$line
EOF_ROW
    source="$(trim "$source_col")"
    status="$(trim "$status_col")"
    case "$source" in
      ""|workspace\ source|Source\ workspace\ asset|---*) continue ;;
    esac

    case "$status" in
      copied|overridden)
        project_path="$(extract_backticked_path "$path_col")"
        if [ -z "$project_path" ]; then
          fail "copied asset row missing backticked project-local path (fix: see docs/workspace-baseline.md)"
        elif ! asset_is_nonempty "$project_path"; then
          fail "copied asset missing or empty: $project_path (fix: see docs/workspace-baseline.md)"
        fi
        [ "$status" = "overridden" ] && info "copied asset has recorded local override: $project_path"
        ;;
      "not imported"|pointer-only)
        :
        ;;
      *)
        warn "unparseable status in copied-assets row: $status"
        ;;
    esac
  done < "$baseline"
}

check_base_agents() {
  fix="docs/workspace-baseline.md"
  if [ ! -s .agents/core/base/BASE_AGENTS.md ]; then
    fail ".agents/core/base/BASE_AGENTS.md is missing or empty (fix: see $fix)"
  fi
}

check_claude_entry() {
  entry="CLAUDE.md"
  fix=".agents/core/templates/claude-project-entry-template.md"

  if [ ! -f "$entry" ]; then
    fail "Claude project entry is missing: CLAUDE.md (fix: generate from $fix or workspace source)"
    return
  fi

  grep -Fxq '@AGENTS.md' "$entry" || fail "Claude project entry must import @AGENTS.md: CLAUDE.md"
  contains_literal "$entry" ".claude/skills/<name>/SKILL.md" || fail "Claude project entry missing native skill discovery pointer: CLAUDE.md"
  contains_literal "$entry" "docs/workspace-baseline.md" || fail "Claude project entry missing workspace baseline pointer: CLAUDE.md"
  contains_literal "$entry" "bash scripts/project-check.sh" || fail "Claude project entry missing project-check pointer: CLAUDE.md"
  contains_literal "$entry" "不複製規則" || fail "Claude project entry missing no-copy guard: CLAUDE.md"

  lines="$(awk 'END { print NR }' "$entry")"
  [ "$lines" -le 30 ] || fail "Claude project entry exceeds 30 lines: CLAUDE.md"

  if adapter_has_copied_rules "$entry" AGENTS.md; then
    fail "Claude project entry contains copied AGENTS.md rules: CLAUDE.md"
  fi
  if grep -Eq '(/Users/|/home/|[A-Za-z]:\\\\|\.\./)' "$entry"; then
    fail "Claude project entry contains non-portable path: CLAUDE.md"
  fi
}

check_claude_skill_adapters() {
  canonical_count=0
  adapter_count=0

  while IFS= read -r canonical; do
    [ -f "$canonical" ] || continue
    canonical_count=$((canonical_count + 1))
    name="$(basename "$(dirname "$canonical")")"
    adapter=".claude/skills/$name/SKILL.md"

    if [ ! -f "$adapter" ]; then
      fail "missing Claude project skill adapter: $adapter (fix: generate from .agents/core/templates/claude-project-skill-adapter-template.md or workspace source)"
      continue
    fi

    frontmatter_name="$(frontmatter_value "$adapter" name)"
    frontmatter_description="$(frontmatter_value "$adapter" description)"
    canonical_description="$(frontmatter_value "$canonical" description)"

    [ "$frontmatter_name" = "$name" ] || fail "Claude project skill adapter name mismatch: $adapter"
    [ -n "$frontmatter_description" ] || fail "Claude project skill adapter description is missing: $adapter"
    [ "$frontmatter_description" = "$canonical_description" ] || fail "Claude project skill adapter description drift: $adapter"
    contains_literal "$adapter" "$canonical" || fail "Claude project skill adapter canonical pointer mismatch: $adapter must point to $canonical"
    contains_literal "$adapter" "不複製規則" || fail "Claude project skill adapter missing no-copy guard: $adapter"

    lines="$(awk 'END { print NR }' "$adapter")"
    [ "$lines" -le 30 ] || fail "Claude project skill adapter exceeds 30 lines: $adapter"

    if adapter_has_copied_rules "$adapter" "$canonical"; then
      fail "Claude project skill adapter contains copied canonical rules: $adapter"
    fi
    if grep -Eq '(/Users/|/home/|[A-Za-z]:\\\\|\.\./)' "$adapter"; then
      fail "Claude project skill adapter contains non-portable path: $adapter"
    fi
  done < <(find .agents/core/skills -mindepth 2 -maxdepth 2 -type f -name SKILL.md 2>/dev/null | sort)

  while IFS= read -r adapter; do
    [ -f "$adapter" ] || continue
    adapter_count=$((adapter_count + 1))
    name="$(basename "$(dirname "$adapter")")"
    canonical=".agents/core/skills/$name/SKILL.md"
    [ -f "$canonical" ] || fail "orphan Claude project skill adapter has no copied core canonical: $adapter"
  done < <(find .claude/skills -mindepth 2 -maxdepth 2 -type f -name SKILL.md 2>/dev/null | sort)

  if [ "$canonical_count" -eq 0 ]; then
    info "Claude project skill adapters skipped because no copied core skills are present"
  else
    info "Claude project skill adapters checked: canonical=$canonical_count adapters=$adapter_count"
  fi
}

check_codex_skill_adapters() {
  canonical_count=0
  adapter_count=0

  while IFS= read -r canonical; do
    [ -f "$canonical" ] || continue
    canonical_count=$((canonical_count + 1))
    name="$(basename "$(dirname "$canonical")")"
    adapter=".agents/skills/$name/SKILL.md"

    if [ ! -f "$adapter" ]; then
      fail "missing Codex project skill adapter: $adapter (fix: generate from .agents/core/templates/codex-project-skill-adapter-template.md or workspace source)"
      continue
    fi

    frontmatter_name="$(frontmatter_value "$adapter" name)"
    frontmatter_description="$(frontmatter_value "$adapter" description)"
    canonical_description="$(frontmatter_value "$canonical" description)"

    [ "$frontmatter_name" = "$name" ] || fail "Codex project skill adapter name mismatch: $adapter"
    [ -n "$frontmatter_description" ] || fail "Codex project skill adapter description is missing: $adapter"
    [ "$frontmatter_description" = "$canonical_description" ] || fail "Codex project skill adapter description drift: $adapter"
    contains_literal "$adapter" "$canonical" || fail "Codex project skill adapter canonical pointer mismatch: $adapter must point to $canonical"
    contains_literal "$adapter" "不複製規則" || fail "Codex project skill adapter missing no-copy guard: $adapter"

    lines="$(awk 'END { print NR }' "$adapter")"
    [ "$lines" -le 30 ] || fail "Codex project skill adapter exceeds 30 lines: $adapter"

    if adapter_has_copied_rules "$adapter" "$canonical"; then
      fail "Codex project skill adapter contains copied canonical rules: $adapter"
    fi
    if grep -Eq '(/Users/|/home/|[A-Za-z]:\\\\|\.\./)' "$adapter"; then
      fail "Codex project skill adapter contains non-portable path: $adapter"
    fi
  done < <(find .agents/core/skills -mindepth 2 -maxdepth 2 -type f -name SKILL.md 2>/dev/null | sort)

  while IFS= read -r adapter; do
    [ -f "$adapter" ] || continue
    adapter_count=$((adapter_count + 1))
    name="$(basename "$(dirname "$adapter")")"
    canonical=".agents/core/skills/$name/SKILL.md"
    [ -f "$canonical" ] || fail "orphan Codex project skill adapter has no copied core canonical: $adapter"
  done < <(find .agents/skills -mindepth 2 -maxdepth 2 -type f -name SKILL.md 2>/dev/null | sort)

  if [ "$canonical_count" -eq 0 ]; then
    info "Codex project skill adapters skipped because no copied core skills are present"
  else
    info "Codex project skill adapters checked: canonical=$canonical_count adapters=$adapter_count"
  fi
}

check_task_structure() {
  fix=".agents/core/templates/task-template.md"
  [ -d docs/tasks ] || return

  while IFS= read -r task; do
    contains_literal "$task" "<!-- project-check: legacy -->" && continue
    for literal in "任務目標" "驗收標準" "任務結尾檢查" "Task status" "Verification status" "Review status" "Repo status"; do
      contains_literal "$task" "$literal" || fail "$task missing required literal: $literal (fix: see $fix)"
    done
  done < <(find docs/tasks -maxdepth 1 -type f -name 'TASK-*.md' | sort)
}

check_pointer_health() {
  candidates=""
  [ -n "${WORKSPACE_REPO:-}" ] && candidates="$candidates
$WORKSPACE_REPO"
  candidates="$candidates
../..
../workspace
../workspace_git/workspace"

  while IFS= read -r candidate; do
    [ -n "$candidate" ] || continue
    if [ -f "$candidate/docs/prompts/README.md" ]; then
      info "workspace pointer reachable: $candidate"
      return
    fi
  done <<EOF_CANDIDATES
$candidates
EOF_CANDIDATES

  info "workspace pointer unavailable; continuing with project-local assets"
}

check_hygiene() {
  crlf_files="$(grep -Ilr "$(printf '\r')" . --exclude-dir=.git 2>/dev/null || true)"
  if [ -n "$crlf_files" ]; then
    fail "CRLF files are present (fix: convert project text files to LF)"
    printf '%s\n' "$crlf_files" | sed 's/^/  /'
  fi

  if [ "$NO_GIT" -eq 1 ]; then
    info "git hygiene skipped in --no-git mode"
    return
  fi

  if ! command -v git >/dev/null 2>&1 || ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    info "git hygiene skipped because git worktree is unavailable"
    return
  fi

  ds_store_files="$(git ls-files | grep -F '.DS_Store' || true)"
  if [ -n "$ds_store_files" ]; then
    fail "tracked .DS_Store files are present (fix: remove them from git)"
    printf '%s\n' "$ds_store_files" | sed 's/^/  /'
  fi

  if ! git diff --check; then
    fail "git diff --check reported whitespace errors (fix: inspect git diff --check)"
  fi
}

check_agents
check_baseline_required_fields
check_copied_assets
check_base_agents
check_claude_entry
check_claude_skill_adapters
check_codex_skill_adapters
check_task_structure
check_pointer_health
check_hygiene

if [ "$failures" -eq 0 ]; then
  printf 'PROJECT-CHECK: PASS version=%s format=%s\n' "$PROJECT_HARNESS_VERSION" "$BASELINE_FORMAT_VERSION"
  exit 0
fi

printf 'PROJECT-CHECK: FAIL version=%s format=%s\n' "$PROJECT_HARNESS_VERSION" "$BASELINE_FORMAT_VERSION"
exit 1
