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
    appName = 'app display name',
    appDescription = 'Write your description here',
    starters = ['Conversation Starter 1', 'Conversation Starter 2']
}: AppViewProps) {
    return (
        <main className="min-h-screen bg-[#0F0F10]">
            <div className="w-full max-w-3xl mx-auto">
                <section className="flex-1">
                    <AppHeader title="app display name" />
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

