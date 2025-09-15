import { EditorConfig } from '../types'

interface ActionsTabProps {
    config: EditorConfig['actions']
    onUpdate: (updates: Partial<EditorConfig['actions']>) => void
}

export default function ActionsTab({ config, onUpdate }: ActionsTabProps) {
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
