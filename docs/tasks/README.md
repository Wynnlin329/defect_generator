# Project Tasks

此目錄存放 `defect_generator` 的 project-local 任務文件。

## 建立方式

1. 使用 `.agents/skills/requirement-breakdown/SKILL.md` 路由到 project-local canonical workflow。
2. 以 `.agents/core/templates/task-template.md` 建立下一個 `TASK-xxx.md`。
3. 填寫 scope、requirements、acceptance criteria、tests、risks、docs impact 與 confirmation-stop。
4. task 草稿完成後預設停下，取得使用者確認才進入產品程式實作。

## 命名

```text
TASK-001-short-description.md
TASK-002-short-description.md
```

既有 task ID 不重用。若 task 被取消，保留狀態與原因，避免編號語意漂移。

## 目前狀態

- `TASK-001`：前端 Runtime Config 與 Credential 安全基線；`Implemented`，已於commit `e0a408c`提交，offline tests通過，full build/type-check與controlled OAuth integration另行處理。
- `TASK-002`：Direct Dependencies、Fresh Production Build 與既有 Type-check Baseline；`Closed`，fresh install、type-check、production build與16個offline tests通過，已review並提交。

新 task 建立後仍須停在 confirmation gate；使用者明確確認直接實作後，才可修改產品程式、dependency manifests或build設定。
