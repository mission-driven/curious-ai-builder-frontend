import { EditorConfig } from '../types'

interface MoreTabProps {
    config: EditorConfig['more']
    onUpdate: (updates: Partial<EditorConfig['more']>) => void
}

export default function MoreTab({ config, onUpdate }: MoreTabProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">추가 설정</h3>

            {/* Access Code */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">접근 코드</h4>
                <input
                    type="text"
                    value={config.accessCode}
                    onChange={(e) => onUpdate({ accessCode: e.target.value })}
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
                <select
                    value={config.loginDisplayLanguage}
                    onChange={(e) => onUpdate({ loginDisplayLanguage: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                >
                    <option value="English">영어</option>
                    <option value="Korean">한국어</option>
                    <option value="Japanese">일본어</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    이것은 채팅 언어를 제어하지 않습니다. 대신 프롬프트를 조정하세요.
                </p>
            </div>

            {/* Maximum Response Size */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">최대 응답 크기</h4>
                <select
                    value={config.maxResponseSize}
                    onChange={(e) => onUpdate({ maxResponseSize: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                >
                    <option value="Medium">중간</option>
                    <option value="Small">작음</option>
                    <option value="Large">큼</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    출력의 최대 응답 크기를 선택하세요. 더 큰 크기는 응답 시간이 길어질 수 있습니다.
                </p>
            </div>

            {/* Verbosity */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">상세도</h4>
                <select
                    value={config.verbosity}
                    onChange={(e) => onUpdate({ verbosity: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                >
                    <option value="Low">낮음</option>
                    <option value="Medium">중간</option>
                    <option value="High">높음</option>
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
                    value={config.temperature}
                    onChange={(e) => onUpdate({ temperature: parseFloat(e.target.value) })}
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
                    <input
                        type="checkbox"
                        checked={config.turnOffFileUploads}
                        onChange={(e) => onUpdate({ turnOffFileUploads: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">파일 업로드 비활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.turnOnShareChat}
                        onChange={(e) => onUpdate({ turnOnShareChat: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">채팅 공유 활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.enableDictation}
                        onChange={(e) => onUpdate({ enableDictation: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">받아쓰기 활성화 (음성 입력)</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.displayChatHistory}
                        onChange={(e) => onUpdate({ displayChatHistory: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">채팅 기록 표시</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.showLoginOnPageLoad}
                        onChange={(e) => onUpdate({ showLoginOnPageLoad: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">페이지 로드 시 로그인 표시</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.saveConversationsForAnalytics}
                        onChange={(e) => onUpdate({ saveConversationsForAnalytics: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">분석을 위한 대화 저장</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.enablePreChatQuestions}
                        onChange={(e) => onUpdate({ enablePreChatQuestions: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">사전 채팅 질문 활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.addWhiteLabelLink}
                        onChange={(e) => onUpdate({ addWhiteLabelLink: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">화이트라벨 링크 추가 (Pro Plus 플랜 필요)</span>
                </label>
            </div>

            {/* Transcription Language */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">전사 언어</h4>
                <select
                    value={config.transcriptionLanguage}
                    onChange={(e) => onUpdate({ transcriptionLanguage: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                >
                    <option value="Detect language">언어 자동 감지</option>
                    <option value="English">영어</option>
                    <option value="Korean">한국어</option>
                    <option value="Japanese">일본어</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">선호하는 전사 언어를 선택하세요.</p>
            </div>
        </div>
    )
}
