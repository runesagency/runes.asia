import { ReactNode } from "react";

type CTAProps = {
    children: ReactNode;
    imageLink: string;
    className?: Partial<
        Record<
            | "wrapper" //
            | "container"
            | "leftContainer"
            | "rightContainer"
            | "image",
            string
        >
    >;
};

export default function CTA({ children, imageLink, className }: CTAProps) {
    return (
        <section className={className?.wrapper}>
            <div className={`container flex flex-col-reverse lg:flex-row gap-10 justify-between items-center lg:items-stretch ${className?.container}`}>
                <div className={`grid gap-10 lg:max-w-lg pb-20 lg:py-20 relative z-10 overflow-visible flex-shrink-0 ${className?.leftContainer}`}>{children}</div>

                <section className={`relative max-w-lg md:max-w-none md:w-full lg:max-w-full flex-shrink-0 xl:flex-shrink overflow-y-hidden ${className?.rightContainer}`}>
                    <img src={imageLink} alt="" className={`lg:absolute max-w-lg md:max-w-none md:w-full object-contain object-left xl:object-right lg:h-full bottom-0 right-0 ${className?.image}`} />
                </section>
            </div>
        </section>
    );
}
