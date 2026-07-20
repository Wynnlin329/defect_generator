import type { CommonData } from '../../data_struct/CommonData'

export interface AnnouncementItemData extends CommonData {
  date_time: string
  message: string
}
