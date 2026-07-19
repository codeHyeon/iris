import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { getNoticeConfig } from './notice-config.controller.js'
import { guildParamsSchema } from './notice-config.schemas.js'

export const noticeConfigRouter = Router({ mergeParams: true })

noticeConfigRouter.get('/', validate({ params: guildParamsSchema }), getNoticeConfig)
