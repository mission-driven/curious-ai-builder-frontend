import { EditorConfig } from '../types'

interface DesignTabProps {
    config: EditorConfig['design']
    onUpdate: (updates: Partial<EditorConfig['design']>) => void
}

export default function DesignTab({ config, onUpdate }: DesignTabProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">디자인 설정</h3>

            {/* AI App Theme */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI 앱 테마</h4>
                <select
                    value={config.theme}
                    onChange={(e) => onUpdate({ theme: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                >
                    <option value="LA">LA</option>
                    <option value="NYC">NYC</option>
                    <option value="Tokyo">Tokyo</option>
                </select>
            </div>

            {/* Background Color */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">배경색</h4>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                        className="h-10 w-16 rounded border border-gray-300"
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.opacityPercentage}
                        onChange={(e) => onUpdate({ opacityPercentage: parseInt(e.target.value) })}
                        className="flex-1"
                    />
                </div>
                <p className="mt-1 text-xs text-gray-600">변경사항을 저장하려면 불투명도 퍼센트를 제공하세요.</p>
            </div>

            {/* Opacity Percentage */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">불투명도 퍼센트 %</h4>
                <input
                    type="number"
                    value={config.opacityPercentage}
                    onChange={(e) => onUpdate({ opacityPercentage: parseInt(e.target.value) || 0 })}
                    placeholder="0-100"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Font Color */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">글꼴 색상</h4>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={config.fontColor}
                        onChange={(e) => onUpdate({ fontColor: e.target.value })}
                        className="h-10 w-16 rounded border border-gray-300"
                    />
                </div>
            </div>

            {/* Font Face */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">글꼴</h4>
                <select
                    value={config.fontFace}
                    onChange={(e) => onUpdate({ fontFace: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                >
                    <option value="Default">기본</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.enableRightToLeft}
                        onChange={(e) => onUpdate({ enableRightToLeft: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">오른쪽에서 왼쪽으로 활성화</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={config.enableFeedbackButton}
                        onChange={(e) => onUpdate({ enableFeedbackButton: e.target.checked })}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">피드백 버튼 활성화</span>
                </label>
            </div>

            {/* Custom User Avatar */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">사용자 아바타 (선택사항)</h4>
                <input
                    type="text"
                    value={config.customUserAvatar}
                    onChange={(e) => onUpdate({ customUserAvatar: e.target.value })}
                    placeholder="아바타 URL 입력"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Conversation Starters */}
            {[1, 2, 3, 4].map((num) => (
                <div key={num}>
                    <h4 className="mb-2 font-medium text-gray-900">대화 시작하기 #{num}</h4>
                    <input
                        type="text"
                        value={config.conversationStarters[num - 1] || ''}
                        onChange={(e) => {
                            const newStarters = [...config.conversationStarters]
                            newStarters[num - 1] = e.target.value
                            onUpdate({ conversationStarters: newStarters })
                        }}
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
