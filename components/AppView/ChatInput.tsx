export default function ChatInput() {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[210px]">
            <div className="flex items-center gap-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl px-3 py-2">
                <input
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
                    placeholder="Type your message"
                />
                <button className="text-violet-500 hover:text-violet-400" type="button">Send</button>
            </div>
        </div>
    )
}

