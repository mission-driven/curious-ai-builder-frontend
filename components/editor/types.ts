// Editor 설정 타입 정의
export interface EditorConfig {
    // Basic Tab 설정
    basic: {
        aiCopilotPrompt?: string
        uploadedImage?: string
        aiModel: string
        aiName: string
        displayName: string
        aiDescription: string
        prompt: string
        welcomeMessage?: string
        turnOffLogin: boolean
    }

    // Design Tab 설정
    design: {
        theme: string
        backgroundColor: string
        opacityPercentage: number
        fontColor: string
        fontFace: string
        enableRightToLeft: boolean
        enableFeedbackButton: boolean
        customUserAvatar?: string
        conversationStarters: string[]
    }

    // Credits Tab 설정
    credits: {
        freeChats?: number
        resetFreeChatsMonthly: boolean
        disablePayments: boolean
        monetizationType: string
        currency: string
        price: number
        chatsForPrice: number
    }

    // Actions Tab 설정
    actions: {
        fileGeneration: boolean
        googleSearch: boolean
        dateTimeTool: boolean
        imageGeneration: boolean
        stockAnalysisTool: boolean
        speechGeneration: boolean
        voiceMode: boolean
        webhookUrl?: string
        triggerWhen: string
    }

    // More Tab 설정
    more: {
        accessCode?: string
        loginDisplayLanguage: string
        maxResponseSize: string
        verbosity: string
        temperature: number
        turnOffFileUploads: boolean
        turnOnShareChat: boolean
        enableDictation: boolean
        displayChatHistory: boolean
        showLoginOnPageLoad: boolean
        saveConversationsForAnalytics: boolean
        enablePreChatQuestions: boolean
        addWhiteLabelLink: boolean
        transcriptionLanguage: string
    }
}

// 기본 설정값
export const defaultEditorConfig: EditorConfig = {
    basic: {
        aiModel: 'GPT-5 Mini (OpenAI)',
        aiName: '',
        displayName: '',
        aiDescription: '',
        prompt: '',
        turnOffLogin: false,
    },
    design: {
        theme: 'LA',
        backgroundColor: '#000000',
        opacityPercentage: 100,
        fontColor: '#ffffff',
        fontFace: '기본',
        enableRightToLeft: false,
        enableFeedbackButton: true,
        conversationStarters: ['', '', '', ''],
    },
    credits: {
        resetFreeChatsMonthly: false,
        disablePayments: true,
        monetizationType: '일회성 결제',
        currency: 'USD',
        price: 1.00,
        chatsForPrice: 1,
    },
    actions: {
        fileGeneration: false,
        googleSearch: false,
        dateTimeTool: false,
        imageGeneration: false,
        stockAnalysisTool: false,
        speechGeneration: false,
        voiceMode: false,
        triggerWhen: '메시지 전송 시',
    },
    more: {
        loginDisplayLanguage: '한국어',
        maxResponseSize: '중간',
        verbosity: '중간',
        temperature: 0.8,
        turnOffFileUploads: false,
        turnOnShareChat: true,
        enableDictation: true,
        displayChatHistory: true,
        showLoginOnPageLoad: false,
        saveConversationsForAnalytics: true,
        enablePreChatQuestions: false,
        addWhiteLabelLink: false,
        transcriptionLanguage: '언어 자동 감지',
    },
}
