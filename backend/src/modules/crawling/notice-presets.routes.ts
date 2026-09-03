import { Router } from 'express'
import type { RequestHandler } from 'express'
import { ok } from '../../shared/http/api-response.js'
import { listNoticeSitePresets } from './crawl-presets.js'

export const noticePresetsRouter = Router()

const getNoticeSitePresets: RequestHandler = (_request, response) => {
  response.status(200).json(ok(listNoticeSitePresets()))
}

noticePresetsRouter.get('/notice-presets', getNoticeSitePresets)
