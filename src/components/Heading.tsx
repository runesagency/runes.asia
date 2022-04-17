export default function Heading({ title, description, className }: { title: string; description: string; className?: Record<"container" | "title" | "description", string> }) {
    return (
        <div className={`grid gap-2 mx-auto max-w-2xl text-center ${className?.container}`}>
            <h1 className={`title text-linear-yellow bg-gradient-to-r max-w-full overflow-hidden break-words ${className?.title}`} data-typewriter>
                {title}
            </h1>

            <p className={`paragraph text-white max-w-md ${className?.description}`}>{description}</p>
        </div>
    );
}
