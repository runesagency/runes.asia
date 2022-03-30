export default function Stars({ ...props }) {
    return (
        <div {...props} className="fixed top-0 left-0 w-full h-full z-10 bg-[url(/images/bg-stars.png)] bg-repeat bg-fixed">
            {Array(30)
                .fill(0)
                .map((_, i) => {
                    const randomTransform = `translate(${Math.random() * 100}vw, ${Math.random() * 100}vh)`;
                    const randomDelay = `${Math.random() * 2}s`;

                    return (
                        <div key={i} id={"star-" + i} className="absolute top-0 left-0 w-full h-full">
                            <div
                                className="w-[2px] h-[2px] bg-yellow-light animate-pulse"
                                style={{
                                    transform: randomTransform,
                                    animationDelay: randomDelay,
                                }}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
