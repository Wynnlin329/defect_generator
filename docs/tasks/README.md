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

Retrofit 不替使用者決定第一個產品 task，因此目前尚未建立 `TASK-001`。建議候選：

- environment／credential／API config 安全基線；
- offline unit/API contract test baseline；
- TFIDG 與 model mapping contract 釐清。

選定後應先產生 task 草稿並再次停下確認，不直接修改 `src/**`。
