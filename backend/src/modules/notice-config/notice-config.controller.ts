import type { RequestHandler } from 'express'
import { ok } from '../../shared/http/api-response.js'
import { noticeConfigService } from './notice-config.service.js'
import type { GuildParams } from './notice-config.schemas.js'

export const getNoticeConfig: RequestHandler<GuildParams> = async (request, response, next) => {
  try {
    const noticeConfig = await noticeConfigService.getNoticeConfig(request.params.guildId)

    response.status(200).json(ok(noticeConfig))
  } catch (error) {
    next(error)
  }
}
