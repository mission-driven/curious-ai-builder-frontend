interface ConversationStartersProps {
    items: string[];
}

export default function ConversationStarters({ items }: ConversationStartersProps) {
    return (
        <div className="flex flex-col gap-3 mt-4">
            {items.map((label, idx) => (
                <button
                    key={idx}
                    className="w-56 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 text-left"
                    type="button"
                >
                    {label}
                </button>
            ))}
        </div>
    )
}

