import { GetProjectTypeFromInt, ProjectType } from './ProjectType'
import { z } from 'zod'

export interface ProjectData {
  id: string
  ownerUserId: string
  ownerUserName: string
  projectType: ProjectType
  projectName: string
  projectDescription: string
  projectProfile: string
  imageCount: number
  taskCount: number
  createDatetime: string
  lastEditDatetime: string
  lastEditUserId: string
  deleteDatetime: string | null
  isActive: boolean
}

export const ProjectDataSchema = z.object({
  id: z.string(),
  ownerUserId: z.string(),
  ownerUserName: z.string(),
  projectType: z.number(),
  projectName: z.string(),
  projectDescription: z.string(),
  projectProfile: z.string(),
  imageCount: z.number(),
  taskCount: z.number(),
  createDatetime: z.string(),
  lastEditDatetime: z.string(),
  lastEditUserId: z.string(),
  deleteDatetime: z.string(),
  isActive: z.boolean(),
})

export const ProjectDataListSchema = z.array(ProjectDataSchema)

export function GetProjectDataFromSchema(schema: z.infer<typeof ProjectDataSchema>): ProjectData {
  const output: ProjectData = {
    id: schema.id,
    ownerUserId: schema.ownerUserId,
    ownerUserName: schema.ownerUserName,
    projectType: GetProjectTypeFromInt(schema.projectType),
    projectName: schema.projectName,
    projectDescription: schema.projectDescription,
    projectProfile: schema.projectProfile,
    imageCount: schema.imageCount,
    taskCount: schema.taskCount,
    createDatetime: schema.createDatetime,
    lastEditDatetime: schema.lastEditDatetime,
    lastEditUserId: schema.lastEditUserId,
    deleteDatetime: schema.deleteDatetime,
    isActive: schema.isActive,
  }

  return output
}
