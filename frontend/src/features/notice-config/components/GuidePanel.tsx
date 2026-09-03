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
          지원 사이트를 먼저 사용하고, 필요한 경우 직접 설정의 설정 방법과 개발자 요청을 이용해주세요.
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
          title="카테고리 확인"
          description="테스트 크롤링에서 감지된 카테고리 목록을 확인합니다."
        />
        <GuideStep
          number="02"
          title="알림 채널"
          description="모든 공지 알림을 보낼 Discord 채널을 선택하고, 필요하면 채널 목록을 새로고침합니다."
        />
        <GuideStep
          number="03"
          title="구독 역할"
          description="사용자가 카테고리를 구독하면 설정한 이름의 역할이 부여됩니다."
        />
      </div>
    </aside>
  )
}
