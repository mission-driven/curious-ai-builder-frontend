import AppHeader from './AppHeader'
import AppInfoCard from './AppInfoCard'
import ConversationStarters from './ConversationStarters'
import ChatInput from './ChatInput'

interface AppViewProps {
    appName?: string;
    appDescription?: string;
    starters?: string[];
}

export default function AppView({
    appName = '앱 표시 이름',
    appDescription = '여기에 설명을 작성하세요',
    starters = ['대화 시작하기 1', '대화 시작하기 2']
}: AppViewProps) {
    return (
        <main className="min-h-screen bg-[#0F0F10]">
            <div className="w-full max-w-3xl mx-auto">
                <section className="flex-1">
                    <AppHeader title="앱 표시 이름" />
                    <div className="px-6 py-4">
                        <AppInfoCard name={appName} description={appDescription} />
                        <ConversationStarters items={starters} />
                    </div>
                </section>
            </div>
            <ChatInput />
        </main>
    )
}

