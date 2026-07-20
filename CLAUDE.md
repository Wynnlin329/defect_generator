# Project Claude Code Entry

@AGENTS.md

## Claude Code Project-native Layer

- `AGENTS.md` 是 project 規則入口；本檔只負責 Claude Code 啟動時的原生載入，不複製規則。
- Project skills 由 `.claude/skills/<name>/SKILL.md` 發現，完整 workflow 仍在同 repo `.agents/core/skills/<name>/SKILL.md`。
- Project baseline 為 `docs/workspace-baseline.md`；收尾驗證使用 `bash scripts/project-check.sh`。
