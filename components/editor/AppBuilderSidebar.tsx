import { useState, useEffect } from 'react'
import BasicTab from './tabs/BasicTab'
import DesignTab from './tabs/DesignTab'
import CreditsTab from './tabs/CreditsTab'
import ActionsTab from './tabs/ActionsTab'
import MoreTab from './tabs/MoreTab'
import { EditorConfig, defaultEditorConfig } from './types'

type TabType = 'basic' | 'design' | 'credits' | 'actions' | 'more'

interface TabConfig {
    id: TabType
    label: string
}

const TABS: TabConfig[] = [
    { id: 'basic', label: '기본' },
    { id: 'design', label: '디자인' },
    { id: 'credits', label: '크레딧' },
    { id: 'actions', label: '액션' },
    { id: 'more', label: '더보기' },
]

interface AppBuilderSidebarProps {
    config: EditorConfig
    onTabChange?: (tab: TabType) => void
    onConfigChange?: (config: EditorConfig) => void
}

export default function AppBuilderSidebar({ config, onTabChange, onConfigChange }: AppBuilderSidebarProps) {
    const [activeTab, setActiveTab] = useState<TabType>('basic')
    const [localConfig, setLocalConfig] = useState<EditorConfig>(config)

    // 부모에서 받은 config가 변경되면 localConfig도 동기화
    useEffect(() => {
        setLocalConfig(config)
    }, [config])

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
        onTabChange?.(tab)
    }

    const updateConfig = (section: keyof EditorConfig, updates: Partial<EditorConfig[keyof EditorConfig]>) => {
        const newConfig = {
            ...localConfig,
            [section]: {
                ...localConfig[section],
                ...updates,
            },
        }
        setLocalConfig(newConfig)
        onConfigChange?.(newConfig)
    }

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-app-builder-sidebar flex flex-col border-r border-gray-200 bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900">앱 빌더</h2>
                <p className="text-sm text-gray-600">AI 앱을 구성하세요</p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex min-w-0 flex-1 items-center justify-center border-b-2 px-3 py-3 text-md font-medium transition-colors ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <span className="truncate">{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'basic' && <BasicTab config={localConfig.basic} onUpdate={(updates) => updateConfig('basic', updates)} />}
                {activeTab === 'design' && <DesignTab config={localConfig.design} onUpdate={(updates) => updateConfig('design', updates)} />}
                {activeTab === 'credits' && <CreditsTab config={localConfig.credits} onUpdate={(updates) => updateConfig('credits', updates)} />}
                {activeTab === 'actions' && <ActionsTab config={localConfig.actions} onUpdate={(updates) => updateConfig('actions', updates)} />}
                {activeTab === 'more' && <MoreTab config={localConfig.more} onUpdate={(updates) => updateConfig('more', updates)} />}
            </div>
        </aside>
    )
}



