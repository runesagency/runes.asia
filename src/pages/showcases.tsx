import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import * as Button from "@/components/Utils/Buttons";

import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/showcases";

export default function ShowcasesPage() {
    const { locale } = useLanguage("lang", localization);

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-pink">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center max-w-2xl">
                        <h1 className="title">{locale.header.title}</h1>
                        <h4 className="subtitle">{locale.header.subtitle}</h4>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section>
                <div className="container grid gap-10 py-20">
                    <div className="flex flex-wrap items-center gap-3">
                        <Button.Secondary active>All</Button.Secondary>
                        <Button.Secondary>Illustrations</Button.Secondary>
                        <Button.Secondary>Web Development</Button.Secondary>
                    </div>

                    <hr className="border-black border-opacity-30" />

                    <div className="grid grid-cols-4 gap-11">
                        <div className="bg-black h-full w-full aspect-square" />
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-20 relative bg-lime">
                <div className="container flex items-center">
                    <div className="grid gap-10">
                        <div className="container grid gap-5">
                            <h1 className="jumbo-title whitespace-pre-line">{locale.contact.title}</h1>
                            <p className="subtitle">{locale.contact.subtitle}</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
                            <Button.Primary>{locale.contact.button_1}</Button.Primary>
                            <Button.Primary light className="bg-transparent">
                                {locale.contact.button_2}
                            </Button.Primary>
                        </div>
                    </div>

                    <img src="/images/illustrations/treasure.png" alt="treasure" className="max-w-md ml-auto flex-shrink" />
                </div>
            </section>

            <Footer />
        </main>
    );
}
