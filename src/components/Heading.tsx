export default function Heading({
    title,
    description,
    className,
    typewrite,
}: {
    title: string;
    description: string;
    className?: Partial<Record<"container" | "title" | "description", string>>;
    typewrite?: boolean;
}) {
    return (
        <div className={`grid gap-2 mx-auto max-w-3xl text-center place-items-center ${className?.container}`}>
            <h1
                className={`title text-linear-yellow bg-gradient-to-r max-w-full overflow-hidden break-words ${className?.title}`}
                data-typewriter={typeof typewrite === "undefined" ? true : typewrite}
            >
                {title}
            </h1>

            <p className={`paragraph text-white max-w-md ${className?.description}`}>{description}</p>
        </div>
    );
}
