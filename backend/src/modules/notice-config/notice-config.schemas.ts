import { z } from 'zod'

export const guildParamsSchema = z.object({
  guildId: z.string().min(1),
})

export type GuildParams = z.infer<typeof guildParamsSchema>
