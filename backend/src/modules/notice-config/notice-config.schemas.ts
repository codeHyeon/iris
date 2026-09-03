import { z } from 'zod'

export const guildParamsSchema = z.object({
  guildId: z.string().trim().min(1),
})

export const noticeSiteConfigSchema = z.object({
  name: z.string().trim().min(1),
  url: z.string().trim().url(),
  listSelector: z.string().trim().min(1),
  titleSelector: z.string().trim().min(1),
  linkSelector: z.string().trim().min(1),
  dateSelector: z.string().trim().min(1),
  categorySelector: z.string().trim().min(1),
  categoryListSelector: z.string().trim().min(1),
})

export const noticeSiteInputSchema = z.discriminatedUnion('mode', [
  z.object({
    mode: z.literal('preset'),
    presetId: z.string().trim().min(1),
  }),
  z.object({
    mode: z.literal('custom'),
    site: noticeSiteConfigSchema,
  }),
])

export const testCrawlBodySchema = noticeSiteInputSchema

export const saveNoticeConfigBodySchema = z.object({
  site: noticeSiteInputSchema,
  categories: z.array(
    z.object({
      name: z.string().trim().min(1),
      channelId: z.string().trim().min(1),
      roleName: z.string().trim().optional(),
      isActive: z.boolean(),
    }),
  ).min(1),
})

export const updateNoticeCategoriesBodySchema = z.object({
  categories: z.array(
    z.object({
      categoryId: z.number().int().positive(),
      channelId: z.string().trim().min(1),
      roleName: z.string().trim().optional(),
      isActive: z.boolean(),
    }),
  ).min(1),
})

export type GuildParams = z.infer<typeof guildParamsSchema>
export type NoticeSiteConfig = z.infer<typeof noticeSiteConfigSchema>
export type NoticeSiteInput = z.infer<typeof noticeSiteInputSchema>
export type TestCrawlBody = z.infer<typeof testCrawlBodySchema>
export type SaveNoticeConfigBody = z.infer<typeof saveNoticeConfigBodySchema>
export type UpdateNoticeCategoriesBody = z.infer<typeof updateNoticeCategoriesBodySchema>
