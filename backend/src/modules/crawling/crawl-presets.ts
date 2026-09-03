import { AppError } from '../../shared/errors/app-error.js'
import type { CrawlInput } from './crawler.types.js'

export type NoticeSitePreset = CrawlInput & {
  id: string
}

const noticeSitePresets = [
  {
    id: 'knu-computer-science',
    name: '경북대학교 컴퓨터학부',
    url: 'https://computer.knu.ac.kr/bbs/board.php?bo_table=sub6_1_a&lang=kor',
    listSelector: '.basic_tbl_head tbody > tr',
    titleSelector: '.bo_tit a',
    linkSelector: '.bo_tit a',
    dateSelector: '.td_datetime',
    categorySelector: '.bo_cate_link',
    categoryListSelector: '#bo_cate_ul a',
  },
] as const satisfies NoticeSitePreset[]

export function listNoticeSitePresets() {
  return noticeSitePresets.map(({ id, name, url }) => ({
    id,
    name,
    url,
  }))
}

export function getNoticeSitePreset(presetId: string): CrawlInput {
  const preset = noticeSitePresets.find((candidate) => candidate.id === presetId)

  if (!preset) {
    throw new AppError(400, '지원하지 않는 공지 사이트 프리셋입니다.')
  }

  return {
    name: preset.name,
    url: preset.url,
    listSelector: preset.listSelector,
    titleSelector: preset.titleSelector,
    linkSelector: preset.linkSelector,
    dateSelector: preset.dateSelector,
    categorySelector: preset.categorySelector,
    categoryListSelector: preset.categoryListSelector,
  }
}
