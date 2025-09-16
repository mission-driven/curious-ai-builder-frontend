import Head from 'next/head'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { DeviceType } from '../components/editor/EditorHeader'
import { EditorConfig, AppViewConfig, defaultEditorConfig } from '../components/editor/types'

const AppBuilderSidebar = dynamic(() => import('../components/editor/AppBuilderSidebar'), { ssr: false })
const AppView = dynamic(() => import('../components/AppView'), { ssr: false })
const IFrame = dynamic(() => import('../components/editor/IFrame'), { ssr: false })
const EditorHeader = dynamic(() => import('../components/editor/EditorHeader'), { ssr: false })

export default function EditorPage() {
    const [deviceDimensions, setDeviceDimensions] = useState({ width: '375px', height: '812px' })
    const [editorConfig, setEditorConfig] = useState<EditorConfig>(defaultEditorConfig)
    const [isLoading, setIsLoading] = useState(true)

    // EditorConfig를 AppViewConfig로 변환하는 함수
    const useAppViewConfig = (config: EditorConfig): AppViewConfig => {
        return {
            backgroundColor: config.design.backgroundColor,
            fontColor: config.design.fontColor,
            conversationStarters: config.design.conversationStarters,
            theme: config.design.theme,
            appName: config.basic.displayName,
            appDescription: config.basic.aiDescription,
        }
    }

    const handleDeviceChange = (device: DeviceType, dimensions: { width: string; height: string }) => {
        setDeviceDimensions(dimensions)
    }

    const handleConfigChange = (config: EditorConfig) => {
        setEditorConfig(config)
        console.log('Editor config updated:', config) // 디버깅용
    }

    const handleCreateApp = () => {
        console.log('=== 앱 생성 버튼 클릭 ===')
        console.log('현재 설정값들:', editorConfig)
        console.log('선택된 디바이스 크기:', deviceDimensions)
        console.log('========================')

        // TODO: 서버로 설정값 전송
        // fetch('/api/apps/create', { method: 'POST', body: JSON.stringify(editorConfig) })
    }

    // 서버에서 기존 설정값 불러오기 (수정 상황)
    useEffect(() => {
        const loadSavedConfig = async () => {
            try {
                // TODO: 실제 appId를 URL 파라미터나 다른 방식으로 가져와야 함
                const appId = 'example-app-id' // 임시값

                const response = await fetch(`/api/apps/${appId}/config`)
                if (response.ok) {
                    const savedConfig = await response.json()
                    setEditorConfig(savedConfig)
                } else {
                    // 기존 설정이 없으면 기본값 사용
                    setEditorConfig(defaultEditorConfig)
                }
            } catch (error) {
                console.error('설정 불러오기 실패:', error)
                // 에러시 기본값 사용
                setEditorConfig(defaultEditorConfig)
            } finally {
                setIsLoading(false)
            }
        }

        loadSavedConfig()
    }, [])

    // 로딩 중일 때
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">설정을 불러오는 중...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>새 AI 앱 생성 - Curi-AI</title>
            </Head>
            <AppBuilderSidebar config={editorConfig} onConfigChange={handleConfigChange} />
            <div className="min-h-screen bg-white pl-app-builder-sidebar">
                <EditorHeader onDeviceChange={handleDeviceChange} onCreateApp={handleCreateApp} />
                <div className="flex justify-center p-4">
                    <div
                        className="border border-gray-300 rounded-lg overflow-hidden"
                        style={{
                            width: deviceDimensions.width,
                            height: deviceDimensions.height,
                            maxHeight: 'calc(100vh - 120px)'
                        }}
                    >
                        <IFrame
                            title="App Preview"
                            className="w-full h-full"
                            htmlAttrs={{ lang: 'en' }}
                            copyParentStyles
                            head={(
                                <>
                                    <meta charSet="utf-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                                    <title>Preview</title>
                                    <style>{`body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif; }`}</style>
                                </>
                            )}
                        >
                            <AppView config={useAppViewConfig(editorConfig)} />
                        </IFrame>
                    </div>
                </div>
            </div>
        </>
    )
}
