import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>AI Builder - AI 에이전트 생성 플랫폼</title>
                <meta name="description" content="사용자가 Custom AI App을 생성하고, 마켓플레이스를 통해 공유하며, 수익화할 수 있는 AI 에이전트 플랫폼" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            AI Builder
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            사용자가 Custom AI App을 생성하고, 마켓플레이스를 통해 공유하며, 수익화할 수 있는 AI 에이전트 플랫폼
                        </p>
                        <div className="space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                                시작하기
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg border-2 border-blue-600 transition-colors">
                                자세히 보기
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
