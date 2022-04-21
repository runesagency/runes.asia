import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";
import LangChooser from "@/components/LangChooser";
import Button from "@/components/Button";

import * as localization from "@/lib/localization/pages/services";
import * as Icon from "@/components/Icons";
import { useLanguage, useTypewriter } from "@/lib/hooks";

export default function Services() {
    useTypewriter();
    const { locale } = useLanguage("lang", localization);

    const icons = [Icon.Design, Icon.Development, Icon.Marketing, Icon.SMM, Icon.Branding];

    return (
        <main className="relative bg-black">
            {/* Header */}
            <header className="container relative z-20">
                <Navigation />
            </header>

            {/* Intro */}
            <section id="intro" className="relative pb-48">
                {/* Content */}
                <div className="relative container grid gap-20 z-10">
                    {/* Icons */}
                    <div className="flex justify-between items-center max-w-xl w-full mx-auto fill-yellow-light stroke-yellow-light">
                        {icons.map((Icon, index) => (
                            <Icon key={index} className="h-8 md:h-11" />
                        ))}
                    </div>

                    <Heading //
                        title={locale.intro.title}
                        description={locale.intro.description}
                    />

                    {/* Rate Card */}
                    <div className="max-w-6xl w-full mx-auto flex flex-col-reverse lg:flex-row">
                        {/* Left */}
                        <section className="px-16 py-12 grid gap-6 flex-shrink place-items-center lg:place-items-start bg-gray">
                            <Heading //
                                title={locale.intro.rateCard.title}
                                description={locale.intro.rateCard.description}
                                typewrite={false}
                                className={{
                                    container: "lg:!text-left lg:!place-items-start lg:!mx-0",
                                    title: "text-5xl w-max",
                                }}
                            />

                            <LangChooser className="text-white" tooltipAlign="left" />

                            <Button href={locale.intro.rateCard.link} target="_blank" rel="noreferrer">
                                {locale.intro.rateCard.button}
                            </Button>
                        </section>

                        {/* Right */}
                        <img
                            src="/images/others/rate-card-cover.png"
                            alt=""
                            className="object-right lg:max-w-md xl:max-w-xl object-cover flex-shrink-0 p-2 from-yellow-light to-yellow-medium bg-gradient-to-b"
                        />
                    </div>
                </div>

                {/* Pattern 1 */}
                <img src="/images/others/dots-horizontal.svg" alt="" className="dots-pattern top-0 left-0" />

                {/* Pattern 2 */}
                <img src="/images/others/dots-vertical.svg" alt="" className="dots-pattern bottom-0 right-0" />
            </section>

            <section id="proposals" className="relative from-yellow-light to-yellow-medium bg-gradient-to-b py-24">
                <div className="container grid gap-16 relative">
                    <Heading //
                        title={locale.proposals.title}
                        description={locale.proposals.description}
                        className={{
                            container: "relative z-10 md:w-max px-2",
                            title: "text-6xl !text-black",
                            description: "!text-black",
                        }}
                    />

                    <div className="grid gap-9">
                        {locale.proposals.lists.map((proposal, index) => (
                            <article key={index} className="bg-black px-12 py-7 flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between items-center text-white">
                                <div className="grid gap-2 max-w-lg text-center md:text-left">
                                    <h3 className="font-el-messiri text-4xl text-yellow-light">{proposal.title}</h3>
                                    <p className="paragraph">{proposal.description}</p>
                                </div>

                                <div className="grid gap-4 max-w-lg flex-shrink-0">
                                    <LangChooser />
                                    <Button href={proposal.link} target="_blank" rel="noreferrer" className="text-black">
                                        {locale.proposals.button}
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="relative py-12">
                <div className="relative container z-20 grid gap-12 lg:grid-cols-2 text-yellow-light py-20">
                    <Heading //
                        title={locale.contact.title}
                        description={locale.contact.description}
                        className={{
                            container: "!text-left !place-items-start !mx-0",
                        }}
                    />

                    <ContactForm theme="yellow" />
                </div>

                <div className="from-yellow-light to-yellow-medium bg-gradient-to-r transform translate-y-8 z-0 relative h-8" />
            </section>

            {/* Footer */}
            <section className="relative py-24 container z-10 bg-black">
                <Footer />
            </section>
        </main>
    );
}
