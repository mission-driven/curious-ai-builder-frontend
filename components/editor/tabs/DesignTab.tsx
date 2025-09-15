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
