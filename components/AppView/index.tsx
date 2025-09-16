import AppHeader from './AppHeader'
import AppInfoCard from './AppInfoCard'
import ConversationStarters from './ConversationStarters'
import ChatInput from './ChatInput'
import { AppViewConfig } from '../editor/types'

interface AppViewProps {
    config: AppViewConfig
}

export default function AppView({ config }: AppViewProps) {
    return (
        <main
            className="min-h-screen"
            style={{
                backgroundColor: config.backgroundColor,
                color: config.fontColor
            }}
        >
            <div className="w-full max-w-3xl mx-auto">
                <section className="flex-1">
                    <AppHeader title={config.appName} />
                    <div className="px-6 py-4">
                        <AppInfoCard
                            name={config.appName}
                            description={config.appDescription}
                        />
                        <ConversationStarters
                            items={config.conversationStarters}
                        />
                    </div>
                </section>
            </div>
            <ChatInput />
        </main>
    )
}

