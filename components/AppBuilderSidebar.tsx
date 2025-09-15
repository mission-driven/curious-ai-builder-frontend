import { useState } from 'react'

type TabType = 'basic' | 'design' | 'credits' | 'actions' | 'more'

interface TabConfig {
    id: TabType
    label: string
}

const TABS: TabConfig[] = [
    { id: 'basic', label: '기본' },
    { id: 'design', label: '디자인' },
    { id: 'credits', label: '크레딧' },
    { id: 'actions', label: '액션' },
    { id: 'more', label: '더보기' },
]

interface AppBuilderSidebarProps {
    onTabChange?: (tab: TabType) => void
}

export default function AppBuilderSidebar({ onTabChange }: AppBuilderSidebarProps) {
    const [activeTab, setActiveTab] = useState<TabType>('basic')

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
        onTabChange?.(tab)
    }

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-app-builder-sidebar flex flex-col border-r border-gray-200 bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900">앱 빌더</h2>
                <p className="text-sm text-gray-600">AI 앱을 구성하세요</p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex min-w-0 flex-1 items-center justify-center border-b-2 px-3 py-3 text-md font-medium transition-colors ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <span className="truncate">{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'basic' && <BasicTab />}
                {activeTab === 'design' && <DesignTab />}
                {activeTab === 'credits' && <CreditsTab />}
                {activeTab === 'actions' && <ActionsTab />}
                {activeTab === 'more' && <MoreTab />}
            </div>
        </aside>
    )
}

// Basic Tab Component
function BasicTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">기본 설정</h3>

            {/* AI Copilot */}
            <div>
                <div className="mb-2 flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">AI 코파일럿</h4>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">베타</span>
                </div>
                <textarea
                    placeholder="예: 학생들이 수학을 배우는 데 도움이 되는 교육용 챗봇을 만들어주세요"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                />
                <p className="mt-1 text-xs text-gray-600">앱 아이디어를 설명하면 모든 것을 자동으로 생성합니다</p>
                <button className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    생성하기
                </button>
            </div>

            {/* Upload Image */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">이미지 업로드</h4>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-400">
                    <span className="text-lg">+</span>
                    이미지 선택
                </button>
                <p className="mt-1 text-xs text-gray-500">선택된 이미지 없음</p>
            </div>

            {/* AI Model */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI 모델</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>GPT-5 Mini (OpenAI)</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Gemini Pro</option>
                </select>
                <label className="mt-2 flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">모든 모델 보기</span>
                </label>
            </div>

            {/* AI Name */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI 이름 <span className="text-red-500">*</span></h4>
                <input
                    type="text"
                    placeholder="앱 이름을 입력하세요"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Display Name */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">표시 이름</h4>
                <input
                    type="text"
                    placeholder="앱 표시 이름"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* AI Description */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI 설명 <span className="text-red-500">*</span></h4>
                <textarea
                    placeholder="설명을 작성하세요"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                />
            </div>

            {/* Prompt */}
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">프롬프트</h4>
                    <button className="text-gray-400 hover:text-gray-600">⤢</button>
                </div>
                <textarea
                    placeholder="AI를 위한 프롬프트를 입력하세요...예: 당신은 JokeAI라는 봇으로, 모든 것에 대해 농담으로 답변하는 것이 일입니다. 응답을 짧게 유지하세요."
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={4}
                />
            </div>

            {/* Welcome Message */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">환영 메시지</h4>
                <textarea
                    placeholder="환영 메시지를 입력하세요"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                />
                <p className="mt-1 text-xs text-gray-500">HTML과 JS를 지원합니다.</p>
            </div>

            {/* Turn off Login */}
            <div>
                <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" />
                    <span className="text-sm text-gray-700">
                        로그인 비활성화 (모든 사용량이 귀하의 계정에 기록되며, 채팅 기록과 수익화가 비활성화됩니다)
                    </span>
                </label>
            </div>
        </div>
    )
}

// Design Tab Component
function DesignTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">디자인 설정</h3>

            {/* AI App Theme */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI 앱 테마</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>LA</option>
                    <option>NYC</option>
                    <option>Tokyo</option>
                </select>
            </div>

            {/* Background Color */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">배경색</h4>
                <div className="flex items-center gap-3">
                    <input type="color" className="h-10 w-16 rounded border border-gray-300" defaultValue="#000000" />
                    <input type="range" min="0" max="100" className="flex-1" />
                </div>
                <p className="mt-1 text-xs text-gray-600">변경사항을 저장하려면 불투명도 퍼센트를 제공하세요.</p>
            </div>

            {/* Opacity Percentage */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">불투명도 퍼센트 %</h4>
                <input
                    type="number"
                    placeholder="0-100"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Font Color */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">글꼴 색상</h4>
                <div className="flex items-center gap-3">
                    <input type="color" className="h-10 w-16 rounded border border-gray-300" defaultValue="#ffffff" />
                    <input type="range" min="0" max="100" className="flex-1" />
                </div>
            </div>

            {/* Font Face */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">글꼴</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>기본</option>
                    <option>Arial</option>
                    <option>Helvetica</option>
                </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">오른쪽에서 왼쪽으로 활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">피드백 버튼 활성화</span>
                </label>
            </div>

            {/* Custom User Avatar */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">사용자 아바타 (선택사항)</h4>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-400">
                    + 이미지 선택
                </button>
            </div>

            {/* Conversation Starters */}
            {[1, 2, 3, 4].map((num) => (
                <div key={num}>
                    <h4 className="mb-2 font-medium text-gray-900">대화 시작하기 #{num}</h4>
                    <input
                        type="text"
                        placeholder={`대화 시작하기 #${num} 입력`}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-600">
                        사용자가 앱과 상호작용을 시작할 수 있도록 대화 시작하기를 추가하세요.
                    </p>
                </div>
            ))}
        </div>
    )
}

// Credits Tab Component
function CreditsTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">크레딧 설정</h3>

            {/* Free Chats */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">무료 채팅 (구독 필요)</h4>
                <input
                    type="number"
                    placeholder="예: 10"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-600">
                    각 신규 사용자가 받을 채팅 크레딧 수입니다. 무제한 무료 채팅을 원하면 비워두세요. 수익화가 활성화된 경우 필수입니다.
                </p>
                <label className="mt-3 flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">매월 무료 채팅 재설정 (구독 필요)</span>
                </label>
            </div>

            {/* Monetization Terms */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">수익화 조건</h4>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">결제 비활성화 (구독 필요)</span>
                </label>

                <div className="mt-4 space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">수익화 유형</label>
                        <select className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm">
                            <option>일회성 결제</option>
                            <option>구독</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">통화</label>
                        <select className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>KRW</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">가격</label>
                        <input
                            type="number"
                            step="0.01"
                            defaultValue="1.00"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">가격당 채팅 수</label>
                        <input
                            type="number"
                            defaultValue="1"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
// Actions Tab Component
function ActionsTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">액션 설정</h3>

            {/* Tools */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">도구</h4>
                <div className="mb-3 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
                    <p className="text-sm text-yellow-800">
                        참고: 각 도구 호출은 추가 처리가 필요하므로 응답 시간이 느려질 수 있습니다.
                    </p>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">파일 생성 켜기 (GPT 모델*)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">구글 검색 활성화 (요청당 1개의 추가 프롬프트 사용)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">날짜 및 시간 도구 활성화 (응답에 현재 날짜 사용)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">이미지 생성 활성화 (요청당 1개의 추가 프롬프트 사용)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">주식 분석 도구 활성화 (자세히 보기)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">음성 생성 활성화 (자세히 보기)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">음성 모드 활성화 (응답 읽기)</span>
                    </label>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                    활성화되면 앱 응답이 음성으로 변환되어 자동으로 읽어집니다.
                </p>
            </div>

            {/* Webhook URL */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">웹훅 URL</h4>
                <input
                    type="url"
                    placeholder="웹훅 URL 입력 (예: Zapier, Make.com)"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Trigger When */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">트리거 조건:</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>메시지 전송 시</option>
                    <option>사용자 로그인 시</option>
                    <option>앱 시작 시</option>
                </select>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                <span className="text-lg">+</span>
                웹훅 추가
            </button>

            {/* Sample webhook request body */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">웹훅 요청 본문 예시:</h4>
                <div className="rounded-lg bg-gray-100 p-3 text-xs">
                    <pre className="whitespace-pre-wrap text-gray-700">
                        {`{
  "event": "메시지 전송",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "app_name": "내 앱",
  "user_email": "user@example.com",
  "user_name": "홍길동",
  "last_message": "사용자 메시지",
  "response": "앱 응답 메시지"
}`}
                    </pre>
                </div>
            </div>
        </div>
    )
}

// More Tab Component
function MoreTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">추가 설정</h3>

            {/* Access Code */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">접근 코드</h4>
                <input
                    type="text"
                    placeholder="접근 코드 입력"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-600">
                    앱 사용을 위해 이 코드가 필요합니다. 무제한 접근을 원하면 비워두세요.
                </p>
            </div>

            {/* Login Display Language */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">로그인 표시 언어</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>영어</option>
                    <option>한국어</option>
                    <option>일본어</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    이것은 채팅 언어를 제어하지 않습니다. 대신 프롬프트를 조정하세요.
                </p>
            </div>

            {/* Maximum Response Size */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">최대 응답 크기</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>중간</option>
                    <option>작음</option>
                    <option>큼</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    출력의 최대 응답 크기를 선택하세요. 더 큰 크기는 응답 시간이 길어질 수 있습니다.
                </p>
            </div>

            {/* Verbosity */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">상세도</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>낮음</option>
                    <option>중간</option>
                    <option>높음</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    응답의 상세도를 제어합니다. 낮은 값은 더 간결한 응답을, 높은 값은 더 상세한 응답을 제공합니다.
                </p>
            </div>

            {/* Temperature */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">온도</h4>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="0.8"
                    className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-600">
                    <span>0.0 집중</span>
                    <span>0.5 균형</span>
                    <span>1.0 창의적</span>
                </div>
                <p className="mt-1 text-xs text-gray-600">응답의 무작위성을 제어합니다.</p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">파일 업로드 비활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">채팅 공유 활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">받아쓰기 활성화 (음성 입력)</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">채팅 기록 표시</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">페이지 로드 시 로그인 표시</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">분석을 위한 대화 저장</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">사전 채팅 질문 활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">화이트라벨 링크 추가 (Pro Plus 플랜 필요)</span>
                </label>
            </div>

            {/* Transcription Language */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">전사 언어</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>언어 자동 감지</option>
                    <option>영어</option>
                    <option>한국어</option>
                    <option>일본어</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">선호하는 전사 언어를 선택하세요.</p>
            </div>
        </div>
    )
}

