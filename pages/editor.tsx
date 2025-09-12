import Head from 'next/head'
import dynamic from 'next/dynamic'
const AppBuilderSidebar = dynamic(() => import('../components/AppBuilderSidebar'), { ssr: false })
const AppView = dynamic(() => import('../components/AppView'), { ssr: false })
const IFrame = dynamic(() => import('../components/IFrame'), { ssr: false })

export default function EditorPage() {
    return (
        <>
            <Head>
                <title>새 AI 앱 생성 - Curi-AI</title>
            </Head>
            <AppBuilderSidebar />
            <div className="min-h-screen bg-white pl-app-builder-sidebar">
                <IFrame
                    title="App Preview"
                    className="w-full h-[calc(100vh-0px)]"
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
        </>
    )
}
