import { AppError } from '../../shared/errors/app-error.js'
import { noticeConfigRepository } from './notice-config.repository.js'

export class NoticeConfigService {
  async getNoticeConfig(guildId: string) {
    const noticeSite = await noticeConfigRepository.findByGuildId(guildId)

    if (!noticeSite) {
      throw new AppError(404, 'Notice config not found')
    }

    return {
      site: {
        name: noticeSite.name,
        url: noticeSite.url,
        listSelector: noticeSite.listSelector,
        titleSelector: noticeSite.titleSelector,
        linkSelector: noticeSite.linkSelector,
        dateSelector: noticeSite.dateSelector,
        categorySelector: noticeSite.categorySelector,
      },
      categories: noticeSite.categories.map((category) => ({
        categoryId: category.id,
        name: category.name,
        channelId: category.channelId,
        roleId: category.roleId,
        roleName: category.roleName,
        isActive: category.isActive,
      })),
    }
  }
}

export const noticeConfigService = new NoticeConfigService()
