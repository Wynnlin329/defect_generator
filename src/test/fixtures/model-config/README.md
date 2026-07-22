# Model Config Fixtures

這四份 YAML 是 TASK-003 的最小、deterministic、無敏感資料 fixtures：

- `cutpaste.yaml`：保護 CutPaste download key mapping。
- `mode1.yaml`：保護 Geometric Shapes Mode 1 mapping。
- `mode2.yaml`：保護 Geometric Shapes Mode 2 mapping。
- `anomalydiffusion.yaml`：保護 Anomaly Diffusion mapping。

它們只 characterise frontend parse / mapping / round-trip，不宣稱是正式 backend schema，也不包含真實路徑、token、host 或客戶資料。
