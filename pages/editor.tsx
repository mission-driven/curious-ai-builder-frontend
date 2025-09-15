import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { DeviceType } from '../components/editor/DeviceSelector'
import { EditorConfig } from '../components/editor/types'

const AppBuilderSidebar = dynamic(() => import('../components/editor/AppBuilderSidebar'), { ssr: false })
const AppView = dynamic(() => import('../components/AppView'), { ssr: false })
const IFrame = dynamic(() => import('../components/editor/IFrame'), { ssr: false })
const DeviceSelector = dynamic(() => import('../components/editor/DeviceSelector'), { ssr: false })

export default function EditorPage() {
    const [deviceDimensions, setDeviceDimensions] = useState({ width: '375px', height: '812px' })
    const [editorConfig, setEditorConfig] = useState<EditorConfig | null>(null)

    const handleDeviceChange = (device: DeviceType, dimensions: { width: string; height: string }) => {
        setDeviceDimensions(dimensions)
    }

    const handleConfigChange = (config: EditorConfig) => {
        setEditorConfig(config)
        console.log('Editor config updated:', config) // 디버깅용
    }

    const handleCreateApp = () => {
        if (editorConfig) {
            console.log('=== 앱 생성 버튼 클릭 ===')
            console.log('현재 설정값들:', editorConfig)
            console.log('선택된 디바이스 크기:', deviceDimensions)
            console.log('========================')
        } else {
            console.log('설정값이 아직 없습니다.')
        }
    }

    return (
        <>
            <Head>
                <title>새 AI 앱 생성 - Curi-AI</title>
            </Head>
            <AppBuilderSidebar onConfigChange={handleConfigChange} />
            <div className="min-h-screen bg-white pl-app-builder-sidebar">
                <DeviceSelector onDeviceChange={handleDeviceChange} onCreateApp={handleCreateApp} />
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
                            <AppView />
                        </IFrame>
                    </div>
                </div>
            </div>
        </>
    )
}
