import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
    onSendMessage?: (message: string) => void
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
    const [inputValue, setInputValue] = useState('')
    const [rows, setRows] = useState(1)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const adjustRows = () => {
        // if user do paste, reset textarea
        if (textareaRef.current) {
            const text = textareaRef.current.value
            const textareaWidth = textareaRef.current.offsetWidth
            const fontSize = 16 // 기본 폰트 크기 (px)
            const charWidth = fontSize * 0.75 // 대략적인 문자 폭 (fontSize의 60% -> 65%로 조정)
            const charsPerLine = Math.floor(textareaWidth / charWidth)

            // \n으로 문장을 자름
            const lines = text.split('\n')
            let totalRows = 0

            lines.forEach(line => {
                if (line.length === 0) {
                    totalRows += 1 // 빈 줄도 1줄로 계산
                } else {
                    const lineRows = Math.ceil(line.length / charsPerLine)
                    totalRows += lineRows
                }
            })

            const finalRows = Math.min(Math.max(1, totalRows), 12)
            setRows(finalRows)
        }
    }

    const resetTextarea = () => {
        if (textareaRef.current) {
            setRows(1)
            setInputValue('')
            console.log('resetTextarea')
        }
    }

    const handleSendMessage = () => {
        if (!inputValue.trim()) return

        onSendMessage?.(inputValue)
        setInputValue('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
        // Shift+Enter는 줄바꿈 허용
    }

    return (
        <div className="w-full fixed bottom-4 left-1/2 -translate-x-1/2 max-w-3xl mx-auto px-6">
            <div className="flex flex-col space-y-2 bg-black border border-gray-600 rounded-lg px-3 py-3 h-auto">
                <textarea
                    id="chat-input"
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        adjustRows()
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message"
                    className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent border-none resize-none overflow-y-auto"
                    rows={rows}
                />
                <div className="flex justify-between items-center">
                    {/* Attachment Icon (Paperclip) */}
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Send Icon (Paper Airplane) */}
                    <button
                        onClick={handleSendMessage}
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}