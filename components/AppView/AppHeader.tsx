interface AppHeaderProps {
    title: string;
}

export default function AppHeader({ title }: AppHeaderProps) {
    return (
        <div className="px-6 pt-6 pb-3">
            <h2 className="text-sm font-semibold tracking-wide">{title}</h2>
        </div>
    )
}

