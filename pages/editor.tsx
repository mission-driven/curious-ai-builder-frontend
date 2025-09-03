import Head from 'next/head'
import dynamic from 'next/dynamic'
const AppBuilderSidebar = dynamic(() => import('../components/AppBuilderSidebar'), { ssr: false })

export default function EditorPage() {
    return (
        <>
            <Head>
                <title>Create New AI App - AI Builder</title>
            </Head>
            <AppBuilderSidebar />
            <main className="min-h-screen bg-white pl-app-builder-sidebar">
                <div className="w-full">
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Create New AI App</h1>
                                <p className="mt-2 text-lg text-gray-600">Configure your AI app settings and preview in real-time</p>
                            </div>

                            {/* Main Content Area */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-8">
                                <div className="text-center text-gray-500">
                                    <p className="text-lg">AI App Preview will appear here</p>
                                    <p className="text-sm">Configure settings in the sidebar to see real-time changes</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
