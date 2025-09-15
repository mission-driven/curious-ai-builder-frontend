import { EditorConfig } from '../types'

interface CreditsTabProps {
    config: EditorConfig['credits']
    onUpdate: (updates: Partial<EditorConfig['credits']>) => void
}

export default function CreditsTab({ config, onUpdate }: CreditsTabProps) {
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
