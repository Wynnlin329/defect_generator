export enum ProjectType {
  NONE = 0,
  CLASSIFICATION = 1,
  OBJECT_DETECTION = 2,
  SEGMENTATION = 3,
  ANOMALY_DETECTION = 4,
}

export function GetProjectTypeFromInt(intputNumber: number): ProjectType {
  if (intputNumber == 1) {
    return ProjectType.CLASSIFICATION
  } else if (intputNumber == 2) {
    return ProjectType.OBJECT_DETECTION
  } else if (intputNumber == 3) {
    return ProjectType.SEGMENTATION
  } else if (intputNumber == 4) {
    return ProjectType.ANOMALY_DETECTION
  } else {
    return ProjectType.NONE
  }
}
