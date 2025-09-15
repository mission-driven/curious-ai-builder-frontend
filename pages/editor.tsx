import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { DeviceType } from '../components/editor/DeviceSelector'

const AppBuilderSidebar = dynamic(() => import('../components/AppBuilderSidebar'), { ssr: false })
const AppView = dynamic(() => import('../components/AppView'), { ssr: false })
const IFrame = dynamic(() => import('../components/editor/IFrame'), { ssr: false })
const DeviceSelector = dynamic(() => import('../components/editor/DeviceSelector'), { ssr: false })

export default function EditorPage() {
    const [deviceDimensions, setDeviceDimensions] = useState({ width: '375px', height: '812px' })

    const handleDeviceChange = (device: DeviceType, dimensions: { width: string; height: string }) => {
        setDeviceDimensions(dimensions)
    }

    return (
        <>
            <Head>
                <title>새 AI 앱 생성 - Curi-AI</title>
            </Head>
            <AppBuilderSidebar />
            <div className="min-h-screen bg-white pl-app-builder-sidebar">
                <DeviceSelector onDeviceChange={handleDeviceChange} />
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
