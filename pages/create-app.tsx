import Head from 'next/head'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

type ModelCard = {
    id: string
    name: string
    description: string
    icon: string
    comingSoon?: boolean
}

const GPT_BUILDER_APPS: ModelCard[] = [
    { id: 'blank', name: 'Blank', description: 'All AI Models', icon: '🌄' },
    { id: 'openai-gpt', name: 'OpenAI GPT', description: 'OpenAI models', icon: '🔄' },
    { id: 'claude', name: 'Claude', description: 'Claude models', icon: '⭐' },
    { id: 'gemini', name: 'Gemini', description: 'Google AI', icon: '🔷' },
    { id: 'llama', name: 'Llama', description: 'Meta AI', icon: '∞' },
    { id: 'openai-assistant', name: 'OpenAI Assistant', description: 'AI Assistant', icon: '⚫' },
    { id: 'perplexity', name: 'Perplexity', description: 'AI Search model', icon: '⚪' },
    { id: 'mistral', name: 'Mistral', description: 'Mistral AI', icon: '🟠' },
    { id: 'deepseek', name: 'DeepSeek', description: 'DeepSeek AI', icon: '🐋' },
    { id: 'grok', name: 'Grok', description: 'xAI Vision', icon: '⚫' },
]

const X_TO_Y_CONVERTERS: ModelCard[] = [
    { id: 'text-to-image', name: 'Text to Image', description: 'AI Image Generation', icon: '🌄' },
    { id: 'text-to-video', name: 'Text to Video', description: 'AI Video Generation', icon: '🌊', comingSoon: true },
    { id: 'text-to-speech', name: 'Text to Speech', description: 'AI Speech Generation', icon: '🌊', comingSoon: true },
    { id: 'speech-to-text', name: 'Speech to Text', description: 'AI Speech Recognition', icon: '🌊', comingSoon: true },
]

export default function CreateAppPage() {
    return (
        <>
            <Head>
                <title>Create AI Apps - AI Builder</title>
            </Head>
            <Sidebar />
            <main className="min-h-screen bg-white pl-sidebar">
                <div className="w-full">
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Create AI Apps 🚀</h1>
                                <p className="mt-2 text-lg text-gray-600">Build custom AI apps with our intuitive platform</p>
                            </div>

                            {/* GPT Builder Apps */}
                            <div className="mb-12">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">💡 GPT Builder Apps</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                    {GPT_BUILDER_APPS.map((model) => (
                                        <div
                                            key={model.id}
                                            className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
                                        >
                                            <div className="mb-3 text-3xl">{model.icon}</div>
                                            <h3 className="mb-1 font-semibold text-gray-900">{model.name}</h3>
                                            <p className="text-sm text-gray-600">{model.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* X to Y Converters */}
                            <div>
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">⇄ X to Y Converters</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {X_TO_Y_CONVERTERS.map((converter) => (
                                        <div
                                            key={converter.id}
                                            className={`group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all 
                                                ${converter.comingSoon ? 'opacity-60' : 'cursor-pointer hover:shadow-md hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="mb-3 text-3xl">{converter.icon}</div>
                                            <h3 className="mb-1 font-semibold text-gray-900">{converter.name}</h3>
                                            <p className="text-sm text-gray-600">{converter.description}</p>
                                            {converter.comingSoon && (
                                                <span className="mt-2 inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
