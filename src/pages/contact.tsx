import Navigation from "@/components/Navigation";
import Footer, { Contacts, Socials } from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";

import { theme } from "../../tailwind.config";
import { memo } from "react";
import { useLanguage, useTypewriter } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/contact";

const ContactPage = () => {
    useTypewriter();
    const { locale } = useLanguage("lang", localization);

    return (
        <main className="relative bg-black">
            {/* Header */}
            <header className="container relative z-20">
                <Navigation />
            </header>

            {/* Content */}
            <section id="contact" className="relative z-10 pt-20">
                <div className="relative container grid gap-32 z-10">
                    <Heading
                        title={locale.title} //
                        description={locale.description}
                        className={{
                            container: "!place-items-start !text-left !mx-0",
                        }}
                    />

                    <div className="flex flex-col lg:flex-row justify-between items-start space-y-20 lg:space-y-0">
                        <section className="grid gap-10 max-w-xs text-yellow-light">
                            <Contacts />
                            <Socials />
                        </section>

                        <section className="py-14 px-10 from-yellow-light to-yellow-medium bg-gradient-to-b lg:max-w-lg xl:max-w-2xl w-full flex-shrink-0">
                            <ContactForm />
                        </section>
                    </div>
                </div>

                <iframe
                    className="relative w-full min-h-[500px] -mt-24 z-0 invert-[90%] grayscale-[10%] contrast-[100%]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1398699372476!2d106.71894511476916!3d-6.2452916954793505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fa750812dba1%3A0x2d06ea61f1935b3b!2sRunes%20-%20Creative%20Studio%20%26%20Agency!5e0!3m2!1sid!2sid!4v1650262909369!5m2!1sid!2sid"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="w-full grid place-items-center pt-8 bg-black">
                    <a href="https://goo.gl/maps/3KybSxpnfC67cQ3YA" target={"_blank"} rel="noreferrer" className="button mx-auto">
                        {locale.mapButton}
                    </a>
                </div>
            </section>

            {/* Footer */}
            <section className="relative py-24 container z-10 bg-black">
                <Footer />
            </section>

            <svg className="absolute top-0 left-0 z-0 opacity-75" width="1585" height="1730" viewBox="0 0 1585 1730" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="635" height="2188.17" transform="matrix(-0.707107 0.707107 0.707107 0.707107 37.6106 -266.402)" fill="url(#paint0_linear_286_352)" fillOpacity="0.6" />
                <defs>
                    <linearGradient id="paint0_linear_286_352" x1="295.933" y1="-995.322" x2="324.684" y2="2188.1" gradientUnits="userSpaceOnUse">
                        <stop stopColor={theme.colors.yellow.light} />
                        <stop offset="1" stopColor={theme.colors.yellow.medium} />
                    </linearGradient>
                </defs>
            </svg>

            <svg className="absolute top-0 right-0 z-0 opacity-75 hidden lg:block" width="1079" height="1788" viewBox="0 0 1079 1788" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1338.59" width="635" height="1893.06" transform="rotate(45 1338.59 0)" fill="url(#paint0_linear_286_351)" fillOpacity="0.6" />
                <defs>
                    <linearGradient id="paint0_linear_286_351" x1="1634.53" y1="-861.086" x2="1656.05" y2="1893.06" gradientUnits="userSpaceOnUse">
                        <stop stopColor={theme.colors.yellow.light} />
                        <stop offset="1" stopColor={theme.colors.yellow.medium} />
                    </linearGradient>
                </defs>
            </svg>
        </main>
    );
};

export default memo(ContactPage);
