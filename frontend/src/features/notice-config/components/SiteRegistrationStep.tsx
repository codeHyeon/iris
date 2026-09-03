import { useState } from 'react'
import { PreviewPanel } from './PreviewPanel'
import { SelectorHelpRequestModal } from './SelectorHelpRequestModal'
import { SelectorInput } from './SelectorInput'
import type {
  DetectedCategory,
  NoticeConfigForm,
  NoticePreview,
  SelectorHelpRequest,
  NoticeSiteMode,
  NoticeSitePreset,
} from '../types/noticeConfigTypes'

interface SiteRegistrationStepProps {
  form: NoticeConfigForm
  siteMode: NoticeSiteMode
  presets: NoticeSitePreset[]
  selectedPresetId: string
  isLoadingPresets: boolean
  presetLoadError: string | null
  isCrawling: boolean
  crawlError: string | null
  notices: NoticePreview[]
  categories: DetectedCategory[]
  selectorGuideUrl: string
  onSiteModeChange: (mode: NoticeSiteMode) => void
  onPresetSelect: (presetId: string) => void
  onFormChange: (field: keyof NoticeConfigForm, value: string) => void
  onTestCrawl: () => void
  onNext: () => void
  onSelectorHelpRequest: (request: SelectorHelpRequest) => Promise<void>
}

export function SiteRegistrationStep({
  form,
  siteMode,
  presets,
  selectedPresetId,
  isLoadingPresets,
  presetLoadError,
  isCrawling,
  crawlError,
  notices,
  categories,
  selectorGuideUrl,
  onSiteModeChange,
  onPresetSelect,
  onFormChange,
  onTestCrawl,
  onNext,
  onSelectorHelpRequest,
}: SiteRegistrationStepProps) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const canGoNext = categories.length > 0
  const canTestCrawl = siteMode === 'custom' || (!isLoadingPresets && Boolean(selectedPresetId))

  const openSelectorGuide = () => {
    window.open(selectorGuideUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="admin-main">
      <header className="admin-heading with-actions">
        <div>
          <h1>사이트 등록</h1>
          <p>지원되는 공지 사이트를 선택하거나 직접 설정하세요.</p>
        </div>
        <div className="site-mode-toggle" aria-label="사이트 설정 방식">
          <button
            className={siteMode === 'preset' ? 'site-mode-button active' : 'site-mode-button'}
            type="button"
            onClick={() => onSiteModeChange('preset')}
          >
            지원 사이트
          </button>
          <button
            className={siteMode === 'custom' ? 'site-mode-button active' : 'site-mode-button'}
            type="button"
            onClick={() => onSiteModeChange('custom')}
          >
            직접 설정
          </button>
        </div>
      </header>

      {siteMode === 'preset' ? (
        <section className="form-section">
          <h2>1. 공지 사이트 선택</h2>
          {isLoadingPresets && <p className="table-message">지원 사이트 목록을 불러오는 중입니다.</p>}
          {presetLoadError && <p className="table-message error">{presetLoadError}</p>}
          <div className="preset-list">
            {presets.map((preset) => (
              <button
                className={preset.id === selectedPresetId ? 'preset-option selected' : 'preset-option'}
                type="button"
                key={preset.id}
                onClick={() => onPresetSelect(preset.id)}
              >
                <span className="preset-topline">
                  <strong className="preset-name">{preset.name}</strong>
                  {preset.id === selectedPresetId && <span className="preset-selected-badge">선택됨</span>}
                </span>
                <span className="preset-url">{toDisplayHost(preset.url)}</span>
              </button>
            ))}
          </div>
          <div className="preset-request-row">
            <span>원하는 사이트가 없나요?</span>
            <button className="primary-small" type="button" onClick={() => setIsRequestModalOpen(true)}>
              사이트 추가 요청
            </button>
          </div>
          {!isLoadingPresets && presets.length === 0 && (
            <p className="table-message">사용 가능한 지원 사이트가 없습니다.</p>
          )}
        </section>
      ) : (
        <>
          <section className="form-section">
            <h2>1. 공지 사이트 정보 입력</h2>
            <label htmlFor="siteName">사이트 이름</label>
            <input
              id="siteName"
              value={form.siteName}
              placeholder="예: 경북대학교 컴퓨터학부"
              onChange={(event) => onFormChange('siteName', event.target.value)}
            />
            <label htmlFor="url">공지 사이트 URL</label>
            <input
              id="url"
              value={form.url}
              placeholder="예: https://computer.knu.ac.kr/bbs/board.php?bo_table=sub6_1_a&lang=kor"
              onChange={(event) => onFormChange('url', event.target.value)}
            />
          </section>

          <section className="form-section">
            <div className="section-title-row">
              <h2>2. Selector 설정</h2>
              <div className="helper-actions">
                <span>도움이 필요하신가요?</span>
                <button className="primary-small" type="button" onClick={openSelectorGuide}>
                  설정 방법
                </button>
              </div>
            </div>

            <SelectorInput
              id="listSelector"
              label="목록 Selector (list)"
              value={form.listSelector}
              placeholder="예: .basic_tbl_head tbody > tr"
              onChange={(value) => onFormChange('listSelector', value)}
            />
            <SelectorInput
              id="titleSelector"
              label="제목 Selector (title)"
              value={form.titleSelector}
              placeholder="예: .bo_tit a"
              onChange={(value) => onFormChange('titleSelector', value)}
            />
            <SelectorInput
              id="linkSelector"
              label="링크 Selector (link)"
              value={form.linkSelector}
              placeholder="예: .bo_tit a"
              onChange={(value) => onFormChange('linkSelector', value)}
            />
            <SelectorInput
              id="dateSelector"
              label="날짜 Selector (date)"
              value={form.dateSelector}
              placeholder="예: .td_datetime"
              onChange={(value) => onFormChange('dateSelector', value)}
            />
            <SelectorInput
              id="categorySelector"
              label="카테고리 Selector (category)"
              value={form.categorySelector}
              placeholder="예: .bo_cate_link"
              onChange={(value) => onFormChange('categorySelector', value)}
            />
            <SelectorInput
              id="categoryListSelector"
              label="전체 카테고리 Selector (category list)"
              value={form.categoryListSelector}
              placeholder="예: #bo_cate_ul a"
              onChange={(value) => onFormChange('categoryListSelector', value)}
            />
          </section>
        </>
      )}

      <button className="wide-primary" type="button" disabled={isCrawling || !canTestCrawl} onClick={onTestCrawl}>
        {isCrawling ? '테스트 크롤링 중...' : '테스트 크롤링'}
      </button>

      {crawlError && <p className="table-message error">{crawlError}</p>}

      <PreviewPanel notices={notices} categories={categories} />

      <div className="admin-actions end">
        <button className="primary-action" type="button" disabled={!canGoNext} onClick={onNext}>
          다음 →
        </button>
      </div>

      {isRequestModalOpen && (
        <SelectorHelpRequestModal
          initialSiteName={siteMode === 'custom' ? form.siteName : ''}
          initialUrl={siteMode === 'custom' ? form.url : ''}
          onClose={() => setIsRequestModalOpen(false)}
          onSubmit={onSelectorHelpRequest}
        />
      )}
    </div>
  )
}

function toDisplayHost(url: string) {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}
