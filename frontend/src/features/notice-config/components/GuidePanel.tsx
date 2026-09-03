import type { AdminStep } from '../types/adminFlowTypes'

interface GuideStepProps {
  number: string
  title: string
  description: string
}

function GuideStep({ number, title, description }: GuideStepProps) {
  return (
    <section className="guide-step">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </section>
  )
}

export function GuidePanel({ step }: { step: AdminStep }) {
  if (step === 'site') {
    return (
      <aside className="guide-panel">
        <h2>Guide</h2>
        <div className="guide-step-list">
          <GuideStep
            number="01"
            title="지원 사이트 선택"
            description="검증된 경북대학교 계열 공지 사이트를 선택합니다."
          />
          <GuideStep
            number="02"
            title="직접 설정"
            description="지원 목록에 없는 사이트는 URL과 CSS Selector를 직접 입력할 수 있습니다."
          />
          <GuideStep
            number="03"
            title="테스트 크롤링 확인"
            description="최근 공지와 감지된 카테고리가 제대로 보이는지 확인합니다."
          />
        </div>
        <p className="guide-tip">
          테스트 크롤링 결과를 확인한 뒤 카테고리 설정으로 이동하세요.
        </p>
      </aside>
    )
  }

  return (
    <aside className="guide-panel">
      <h2>Guide</h2>
      <div className="guide-step-list">
        <GuideStep
          number="01"
          title="알림 채널"
          description="모든 공지 알림을 보낼 Discord 채널을 선택하고, 필요하면 채널 목록을 새로고침합니다."
        />
        <GuideStep
          number="02"
          title="구독 역할"
          description="카테고리별 역할 이름을 정합니다. 사용자가 구독하면 역할이 부여되고, 새 공지는 해당 역할을 멘션해 전달됩니다."
        />
      </div>
    </aside>
  )
}
