import { useState } from 'react'

type TabType = 'basic' | 'design' | 'credits' | 'actions' | 'more'

interface TabConfig {
    id: TabType
    label: string
}

const TABS: TabConfig[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'design', label: 'Design' },
    { id: 'credits', label: 'Credits' },
    { id: 'actions', label: 'Actions' },
    { id: 'more', label: 'More' },
]

interface AppBuilderSidebarProps {
    onTabChange?: (tab: TabType) => void
}

export default function AppBuilderSidebar({ onTabChange }: AppBuilderSidebarProps) {
    const [activeTab, setActiveTab] = useState<TabType>('basic')

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
        onTabChange?.(tab)
    }

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-app-builder-sidebar flex flex-col border-r border-gray-200 bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900">App Builder</h2>
                <p className="text-sm text-gray-600">Configure your AI app</p>
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
                {activeTab === 'basic' && <BasicTab />}
                {activeTab === 'design' && <DesignTab />}
                {activeTab === 'credits' && <CreditsTab />}
                {activeTab === 'actions' && <ActionsTab />}
                {activeTab === 'more' && <MoreTab />}
            </div>
        </aside>
    )
}

// Basic Tab Component
function BasicTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Settings</h3>

            {/* AI Copilot */}
            <div>
                <div className="mb-2 flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">AI Copilot</h4>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Beta</span>
                </div>
                <textarea
                    placeholder="Example: Create an educational chatbot that helps students learn math"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                />
                <p className="mt-1 text-xs text-gray-600">Describe your app idea to generate everything automatically</p>
                <button className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Generate
                </button>
            </div>

            {/* Upload Image */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Upload Image</h4>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-400">
                    <span className="text-lg">+</span>
                    Choose Image
                </button>
                <p className="mt-1 text-xs text-gray-500">No image selected</p>
            </div>

            {/* AI Model */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI Model</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>GPT-5 Mini (OpenAI)</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Gemini Pro</option>
                </select>
                <label className="mt-2 flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Show All Models</span>
                </label>
            </div>

            {/* AI Name */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI Name <span className="text-red-500">*</span></h4>
                <input
                    type="text"
                    placeholder="Enter your app name"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Display Name */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Display Name</h4>
                <input
                    type="text"
                    placeholder="app display name"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* AI Description */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI Description <span className="text-red-500">*</span></h4>
                <textarea
                    placeholder="Write your description here"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                />
            </div>

            {/* Prompt */}
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Prompt</h4>
                    <button className="text-gray-400 hover:text-gray-600">⤢</button>
                </div>
                <textarea
                    placeholder="Enter a prompt for your AI...ex:- You are a bot called JokeAI whose job is to reply with jokes to anything. Keep your responses short."
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={4}
                />
            </div>

            {/* Welcome Message */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Welcome Message</h4>
                <textarea
                    placeholder="Enter a welcome message"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                />
                <p className="mt-1 text-xs text-gray-500">Supports HTML and JS.</p>
            </div>

            {/* Turn off Login */}
            <div>
                <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" />
                    <span className="text-sm text-gray-700">
                        Turn off Login (All usage will be logged against your account, and chat history and monetization will be disabled)
                    </span>
                </label>
            </div>
        </div>
    )
}

// Design Tab Component
function DesignTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Design Settings</h3>

            {/* AI App Theme */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">AI App Theme</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>LA</option>
                    <option>NYC</option>
                    <option>Tokyo</option>
                </select>
            </div>

            {/* Background Color */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Background Color</h4>
                <div className="flex items-center gap-3">
                    <input type="color" className="h-10 w-16 rounded border border-gray-300" defaultValue="#000000" />
                    <input type="range" min="0" max="100" className="flex-1" />
                </div>
                <p className="mt-1 text-xs text-gray-600">Provide an Opacity Percentage for the change to be saved.</p>
            </div>

            {/* Opacity Percentage */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Opacity Percentage %</h4>
                <input
                    type="number"
                    placeholder="0-100"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Font Color */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Font Color</h4>
                <div className="flex items-center gap-3">
                    <input type="color" className="h-10 w-16 rounded border border-gray-300" defaultValue="#ffffff" />
                    <input type="range" min="0" max="100" className="flex-1" />
                </div>
            </div>

            {/* Font Face */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Font Face</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>Default</option>
                    <option>Arial</option>
                    <option>Helvetica</option>
                </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Enable right to left</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Enable Feedback Button</span>
                </label>
            </div>

            {/* Custom User Avatar */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Custom User Avatar (optional)</h4>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-400">
                    + Choose Image
                </button>
            </div>

            {/* Conversation Starters */}
            {[1, 2, 3, 4].map((num) => (
                <div key={num}>
                    <h4 className="mb-2 font-medium text-gray-900">Conversation Starter #{num}</h4>
                    <input
                        type="text"
                        placeholder={`Enter conversation starter #${num}`}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-600">
                        Add a conversation starter to help users begin interacting with your app.
                    </p>
                </div>
            ))}
        </div>
    )
}

// Credits Tab Component
function CreditsTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Credits Settings</h3>

            {/* Free Chats */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Free Chats (Subscription Required)</h4>
                <input
                    type="number"
                    placeholder="Ex:- 10"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-600">
                    No. of chat credits each new user will get. Leave blank for unlimited free chats. Required if monetization is enabled.
                </p>
                <label className="mt-3 flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Reset Free Chats Monthly (Subscription Required)</span>
                </label>
            </div>

            {/* Monetization Terms */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Monetization Terms</h4>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Disable Payments (Subscription Required)</span>
                </label>

                <div className="mt-4 space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Monetization Type</label>
                        <select className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm">
                            <option>One-time Payments</option>
                            <option>Subscription</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <select className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>KRW</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            defaultValue="1.00"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Chats for Price</label>
                        <input
                            type="number"
                            defaultValue="1"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Actions Tab Component
function ActionsTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Actions Settings</h3>

            {/* Tools */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Tools</h4>
                <div className="mb-3 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
                    <p className="text-sm text-yellow-800">
                        Note: Each tool call may slow down response times as additional processing is required.
                    </p>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Turn on File Generation (GPT models*)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Enable Google Search (1 extra prompt will be used per request)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Enable Date and Time Tool (Current date will be used in responses)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Enable Image generation (1 extra prompt will be used per request)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Enable Stock Analysis Tool (Learn more here)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Enable Speech Generation (Learn more here)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Enable voice mode (reading responses)</span>
                    </label>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                    When enabled, app responses will be converted to speech and read aloud automatically.
                </p>
            </div>

            {/* Webhook URL */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Webhook URL</h4>
                <input
                    type="url"
                    placeholder="Enter webhook URL (e.g. Zapier, Make.com)"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Trigger When */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Trigger When:</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>Message is sent</option>
                    <option>User logs in</option>
                    <option>App starts</option>
                </select>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                <span className="text-lg">+</span>
                Add Webhook
            </button>

            {/* Sample webhook request body */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Sample webhook request body:</h4>
                <div className="rounded-lg bg-gray-100 p-3 text-xs">
                    <pre className="whitespace-pre-wrap text-gray-700">
                        {`{
  "event": "Message sent",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "app_name": "My App",
  "user_email": "user@example.com",
  "user_name": "John Doe",
  "last_message": "User message",
  "response": "App response message"
}`}
                    </pre>
                </div>
            </div>
        </div>
    )
}

// More Tab Component
function MoreTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">More Settings</h3>

            {/* Access Code */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Access Code</h4>
                <input
                    type="text"
                    placeholder="Enter access code"
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-600">
                    App will require this code to be used. Leave blank for unrestricted access.
                </p>
            </div>

            {/* Login Display Language */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Login Display Language</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>English</option>
                    <option>Korean</option>
                    <option>Japanese</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    This does not control the language of chats. Please adjust the prompt instead.
                </p>
            </div>

            {/* Maximum Response Size */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Maximum Response Size</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>Medium</option>
                    <option>Small</option>
                    <option>Large</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    Select the maximum response size for outputs. Larger sizes may result in longer response times.
                </p>
            </div>

            {/* Verbosity */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Verbosity</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">
                    Controls the verbosity of responses. Lower values result in more concise responses, higher values in more verbose responses.
                </p>
            </div>

            {/* Temperature */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Temperature</h4>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="0.8"
                    className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-600">
                    <span>0.0 Focused</span>
                    <span>0.5 Balanced</span>
                    <span>1.0 Creative</span>
                </div>
                <p className="mt-1 text-xs text-gray-600">Controls randomness in responses.</p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Turn off File Uploads</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Turn on Share Chat</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Enable Dictation (Voice Input)</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Display Chat History</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Show Login on Page Load</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Save Conversations for Analytics</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Enable Pre-Chat Questions</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Add White-Label Link (Pro Plus Plan Required)</span>
                </label>
            </div>

            {/* Transcription Language */}
            <div>
                <h4 className="mb-2 font-medium text-gray-900">Transcription Language</h4>
                <select className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none">
                    <option>Detect language</option>
                    <option>English</option>
                    <option>Korean</option>
                    <option>Japanese</option>
                </select>
                <p className="mt-1 text-xs text-gray-600">Select your preferred transcription language.</p>
            </div>
        </div>
    )
}
