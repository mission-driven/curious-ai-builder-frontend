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
                        <input
                            type="checkbox"
                            checked={config.fileGeneration}
                            onChange={(e) => onUpdate({ fileGeneration: e.target.checked })}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">파일 생성 켜기 (GPT 모델*)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={config.googleSearch}
                            onChange={(e) => onUpdate({ googleSearch: e.target.checked })}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">구글 검색 활성화 (요청당 1개의 추가 프롬프트 사용)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={config.dateTimeTool}
                            onChange={(e) => onUpdate({ dateTimeTool: e.target.checked })}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">날짜 및 시간 도구 활성화 (응답에 현재 날짜 사용)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={config.imageGeneration}
                            onChange={(e) => onUpdate({ imageGeneration: e.target.checked })}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">이미지 생성 활성화 (요청당 1개의 추가 프롬프트 사용)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={config.stockAnalysisTool}
                            onChange={(e) => onUpdate({ stockAnalysisTool: e.target.checked })}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">주식 분석 도구 활성화 (자세히 보기)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={config.speechGeneration}
                            onChange={(e) => onUpdate({ speechGeneration: e.target.checked })}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">음성 생성 활성화 (자세히 보기)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={config.voiceMode}
                            onChange={(e) => onUpdate({ voiceMode: e.target.checked })}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">음성 모드 활성화 (응답 읽기)</span>
                    </label>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                    활성화되면 앱 응답이 음성으로 변환되어 자동으로 읽어집니다.
                </p>
            </div>

        </div>
    )
}
