import { EditorConfig } from '../types'

interface BasicTabProps {
    config: EditorConfig['basic']
    onUpdate: (updates: Partial<EditorConfig['basic']>) => void
}

export default function BasicTab({ config, onUpdate }: BasicTabProps) {
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
                    value={config.aiCopilotPrompt || ''}
                    onChange={(e) => onUpdate({ aiCopilotPrompt: e.target.value })}
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
                <select
                    value={config.aiModel}
                    onChange={(e) => onUpdate({ aiModel: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                >
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
                    value={config.aiName}
                    onChange={(e) => onUpdate({ aiName: e.target.value })}
                    placeholder="앱 이름을 입력하세요"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Display Name */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">표시 이름</h4>
                <input
                    type="text"
                    value={config.displayName}
                    onChange={(e) => onUpdate({ displayName: e.target.value })}
                    placeholder="앱 표시 이름"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* AI Description */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI 설명 <span className="text-red-500">*</span></h4>
                <textarea
                    value={config.aiDescription}
                    onChange={(e) => onUpdate({ aiDescription: e.target.value })}
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
                    value={config.prompt}
                    onChange={(e) => onUpdate({ prompt: e.target.value })}
                    placeholder="AI를 위한 프롬프트를 입력하세요...예: 당신은 JokeAI라는 봇으로, 모든 것에 대해 농담으로 답변하는 것이 일입니다. 응답을 짧게 유지하세요."
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={4}
                />
            </div>

            {/* Welcome Message */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">환영 메시지</h4>
                <textarea
                    value={config.welcomeMessage || ''}
                    onChange={(e) => onUpdate({ welcomeMessage: e.target.value })}
                    placeholder="환영 메시지를 입력하세요"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                />
                <p className="mt-1 text-xs text-gray-500">HTML과 JS를 지원합니다.</p>
            </div>

            {/* Turn off Login */}
            <div>
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={config.turnOffLogin}
                        onChange={(e) => onUpdate({ turnOffLogin: e.target.checked })}
                        className="mt-1 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                        로그인 비활성화 (모든 사용량이 귀하의 계정에 기록되며, 채팅 기록과 수익화가 비활성화됩니다)
                    </span>
                </label>
            </div>
        </div>
    )
}
