import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";

import Link from "next/link";

import { theme } from "../../tailwind.config";
import { useLanguage, useTypewriter, useDragToScroll } from "@/lib/hooks";
import { memo, useEffect } from "react";
import * as localization from "@/lib/localization/pages/home";

const Portfolio = () => {
    const elementId = "portfolio-container";

    type Portofolio = {
        name: string;
        description: string;
        imageId: string;
        columnSpan: number;
        rowSpan: number;
        link: string;
        imagePlacement?: string;
    };

    const portfolios: Portofolio[][] = [
        [
            {
                name: "Naraetos",
                description: "One of our designer decided to try out some design in new style. What do you guys think about it? 💗",
                imageId: "naraetos",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.instagram.com/p/CbXQwI2p6AV/",
            },
            {
                name: "Runes Characters",
                description: "A potrait of us, but in illustrations.",
                imageId: "runes-characters",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.instagram.com/p/CbFBqLfJZ_f/",
            },
            {
                name: "Foxxy Hosting",
                description: "A website prototype design for one of our project, Foxxy, a game hosting services.",
                imageId: "foxxy-hosting",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://www.behance.net/gallery/127128767/Project-Foxxy-Game-Hosting",
            },
            {
                name: "Tune Discord Bot Website",
                description: "The best music bot to accompany you while you were in Discord 24/7.",
                imageId: "tune-website",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://tunebot.org",
            },
            {
                name: "Foxxy Ecommerce",
                description: "An ecommerce, side project website, for Foxxy.",
                imageId: "foxxy-ecommerce",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://demo-ecommerce.runes.asia/home",
            },
            {
                name: "Feby Putri",
                description: "A site for Feby Putri, Indonesian singer-songwriter.",
                imageId: "febyputri",
                imagePlacement: "top",
                columnSpan: 1,
                rowSpan: 2,
                link: "https://byncrecords.com",
            },
            {
                name: "Duta Bahasa Inggris",
                description: "A website project for Duta Bahasa Inggris event, hosted by Briton English Education.",
                imageId: "dbibybriton",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 1,
                link: "https://dbi.britonenglish.co.id",
            },
            {
                name: "Rafly Maulana Site",
                description: "A portfolio site for Rafly Maulana.",
                imageId: "raflymln",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://raflymaulana.me",
            },
        ],
        [
            {
                name: "Harvport",
                description: "Harvport is a group committed to helping fruit growers to export their produce cheaply and easily.",
                imageId: "harvport",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 1,
                link: "https://harvport.com",
            },
            {
                name: "Madaya Group",
                description: "A website for Madaya Group, a mining company based on Indonesia.",
                imageId: "madaya",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://madayagroup.com",
            },
            {
                name: "Araloka Studios",
                description: "Araloka Studios is a Creative Home Production which is incorporated in the space of PT Karya Abadi",
                imageId: "araloka",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://aralokastudios.com",
            },
            {
                name: "Rawr, Drip, Splotch",
                description: "At the moment, we create a nature living design that livin' up your nature! 🍀.",
                imageId: "rawr-drip-splotch",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.behance.net/gallery/138534867/Style-Test-Vol2-Runes",
            },
            {
                name: "IndieSpices",
                description: "",
                imageId: "indiespices",
                imagePlacement: "top",
                columnSpan: 1,
                rowSpan: 2,
                link: "https://indiespices.com",
            },
            {
                name: "Genesi Visual",
                description: "GENESI is a team of wedding photographers and videographers, based in Jakarta.",
                imageId: "genesi",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 1,
                link: "https://genesi.id",
            },
            {
                name: "Circle, Diamond, Heart",
                description: "A random illustration project.",
                imageId: "circle-diamond-heart",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.instagram.com/p/CbNGghep125/",
            },
        ],
    ];

    useDragToScroll(elementId);

    useEffect(() => {
        const portfolio: HTMLElement = document.getElementById(elementId);
        let isScrolling = true;
        let scrollDirection = "right";

        portfolio.onmouseover = () => {
            isScrolling = false;
        };

        portfolio.onmouseleave = () => {
            isScrolling = true;
        };

        const autoScroll = () => {
            if (!isScrolling) return;

            switch (scrollDirection) {
                case "right":
                    portfolio.scrollBy(0.8, 0);

                    if (portfolio.scrollLeft >= portfolio.scrollWidth - portfolio.clientWidth - 5) {
                        scrollDirection = "left";
                    }
                    break;

                case "left":
                    portfolio.scrollBy(-0.8, 0);

                    if (portfolio.scrollLeft <= 0) {
                        scrollDirection = "right";
                    }
            }
        };

        setInterval(autoScroll, 10);
    }, []);

    return (
        <div id={elementId} className="max-w-full cursor-move overflow-x-auto no-scrollbar">
            <section className="relative grid grid-cols-2 w-max gap-4 xl:gap-6">
                {portfolios.map((row, index) => {
                    return (
                        <section key={index} className="relative grid grid-rows-2 grid-cols-8 gap-4 xl:gap-6 auto-cols-max auto-rows-max">
                            {row.map((portfolio, index) => {
                                const span = (span: number) => `span ${span} / span ${span}`;

                                return (
                                    <div
                                        className="relative h-full flip-card overflow-hidden group"
                                        key={index}
                                        style={{
                                            gridColumn: span(portfolio.columnSpan),
                                            gridRow: span(portfolio.rowSpan),
                                        }}
                                    >
                                        <img
                                            className="h-44 w-44 lg:h-64 lg:w-64 min-h-full min-w-full object-cover transform group-hover:scale-110 duration-200"
                                            src={`/images/portfolio/${portfolio.imageId}.png`}
                                            alt={portfolio.name}
                                            style={{
                                                objectPosition: portfolio.imagePlacement || "center",
                                            }}
                                        />

                                        <div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 duration-200 grid gap-1 md:gap-4 auto-rows-max px-6 py-6 place-items-center place-content-center text-center">
                                            <h1 className="font-el-messiri text-lg md:text-2xl text-yellow-light">{portfolio.name}</h1>
                                            <p className="font-lora text-sm text-white max-w-xs leading-relaxed tracking-wide hidden lg:block">{portfolio.description}</p>
                                            <a
                                                className="font-lora text-base underline text-yellow-light font-bold tracking-wide hover:opacity-75 duration-200"
                                                href={portfolio.link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View Project
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    );
                })}
            </section>
        </div>
    );
};

const HomePage = () => {
    useTypewriter();
    const { locale } = useLanguage("lang", localization);

    const clients = [
        {
            name: "Araloka Studios",
            logoId: "araloka",
            href: "https://aralokastudios.com/",
        },
        {
            name: "Feby Putri",
            logoId: "febyputri",
            href: "https://byncrecords.com/",
        },
        {
            name: "Briton English Education",
            logoId: "briton",
            href: "https://britonenglish.co.id/",
        },
        {
            name: "Madaya Group",
            logoId: "madaya",
            href: "https://madayagroup.com/",
        },
        {
            name: "Duta Bahasa Inggris By Briton",
            logoId: "dbibybriton",
            href: "https://dbi.britonenglish.co.id/",
        },
        {
            name: "Tune Discord Bot",
            logoId: "tune",
            href: "https://tunebot.org",
        },
        {
            name: "Harvport",
            logoId: "harvport",
            href: "https://harvport.com/",
        },
        {
            name: "Indiespices",
            logoId: "indiespices",
            href: "https://indiespices.com/",
        },
    ];

    return (
        <main className="relative bg-black">
            {/* Header */}
            <header className="container">
                <Navigation />
            </header>

            {/* Intro */}
            <section id="intro" className="relative">
                {/* Rectangle */}
                <svg className="absolute top-0 -left-10 lg:left-0 h-full fill-transparent from-yellow-light to-yellow-medium bg-gradient-to-b" width="76" height="422" viewBox="0 0 76 422">
                    <rect width="76" height="422" />
                </svg>

                {/* Content */}
                <div className="container pl-8 md:pl-24 flex w-full justify-between items-start mt-16 mb-8">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-el-messiri max-w-xl xl:max-w-3xl text-linear-yellow bg-gradient-to-b" data-typewriter>
                        {locale.intro.title}
                    </h1>

                    {/* Icons */}
                    <div className="hidden md:flex justify-evenly items-center h-44 lg:h-72 xl:h-[400px] -space-x-[50%]">
                        <img src="/images/logo-mark.svg" alt="logo" className="h-full" />
                        <img src="/images/logo-mark.svg" alt="logo2" className="h-full opacity-50" />
                        <img src="/images/logo-mark.svg" alt="logo3" className="h-full opacity-10" />
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="relative z-10">
                {/* Map */}
                <div className="absolute top-0 left-0 transform -translate-x-1/3 z-0">
                    <img src="/images/others/map.png" alt="map" className="hidden xl:block" />
                    <img src="/images/others/map-no-marker.png" alt="map" className="xl:hidden" />
                </div>

                {/* Content */}
                <div className="relative container pl-8 md:pl-24 pt-20 z-10 grid gap-24">
                    {/* Icons */}
                    <div className="flex justify-between items-center w-full max-w-xl lg:max-w-full ml-auto text-yellow-light fill-current">
                        {locale.services.lists.map((service, index) => (
                            <service.icon key={index} className="w-6 md:w-10" />
                        ))}
                    </div>

                    {/* About */}
                    <div className="grid gap-5 lg:ml-auto max-w-xl pb-24 font-lora text-xl md:text-2xl leading-normal">
                        {/* Text 1 */}
                        <p className="text-yellow-light">
                            <b>{locale.about.text_1.intro}</b>
                            {locale.about.text_1.text}
                        </p>

                        {/* Text 2 */}
                        <p className="text-white">{locale.about.text_2}</p>

                        {/* Button */}
                        <Link href={`/about`}>
                            <a className="button">{locale.about.button}</a>
                        </Link>
                    </div>
                </div>

                {/* Peoples */}
                <div className="container flex flex-col items-stretch">
                    {/* Persons */}
                    <img src="/images/characters/stacked-vertical.png" alt="people" className="w-full md:hidden" />
                    <img src="/images/characters/stacked-horizontal.png" alt="people" className="w-full hidden md:block" />

                    {/* Bottom Line */}
                    <div className="from-yellow-medium via-yellow-light to-yellow-medium bg-gradient-to-b h-1 w-full" />
                </div>
            </section>

            {/* Services */}
            <section id="services" className="relative py-32">
                {/* Content */}
                <div className="relative container grid gap-24 z-10">
                    <Heading //
                        title={locale.services.title}
                        description={locale.services.description}
                    />

                    {/* Services */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
                        {locale.services.lists.map((service, index) => (
                            <article key={index} className="grid gap-5 w-72 text-center mx-auto">
                                <service.icon className="w-8 mx-auto fill-yellow-light" />
                                <h3 className="text-yellow-light text-4xl font-lora font-bold mx-auto leading-tight">{service.title}</h3>
                                <p className="paragraph text-white mx-auto">{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Spotlight 1 */}
                <svg className="spotlight left-0 origin-bottom-left" style={{ animationDirection: "alternate" }} viewBox="0 0 2139 1203">
                    <path opacity="0.3" d="M0.5 979.5V1080V1203L2139 0H1918.5H385L0.5 979.5Z" fill="url(#spotlight1)" />

                    <defs>
                        <linearGradient id="spotlight1" x1="548" y1="1080" x2="548" y2="-0.00013015" gradientUnits="userSpaceOnUse">
                            <stop stopColor={theme.colors.yellow.light} />
                            <stop offset="1" stopColor={theme.colors.black} />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Spotlight 2 */}
                <svg className="spotlight right-0 origin-bottom-right" style={{ animationDirection: "alternate-reverse" }} viewBox="0 0 2139 1203">
                    <path opacity="0.3" d="M2139 979.5V1080V1203L0.5 0H221H1754.5L2139 979.5Z" fill="url(#spotlight2)" />

                    <defs>
                        <linearGradient id="spotlight2" x1="1370.5" y1="1080" x2="1370.5" y2="-0.00013015" gradientUnits="userSpaceOnUse">
                            <stop stopColor={theme.colors.yellow.light} />
                            <stop offset="1" stopColor={theme.colors.black} />
                        </linearGradient>
                    </defs>
                </svg>
            </section>

            {/* Portfolio */}
            <section id="portfolio" className="relative grid gap-16 pb-32">
                <Portfolio />

                {/* More Button */}
                <div className="flex flex-col md:flex-row justify-center items-center mx-auto space-y-5 md:space-y-0 md:space-x-5">
                    <p className="paragraph text-white">{locale.portfolio.button}</p>
                    <a href="https://behance.net/wearerunes" target={"_blank"} rel="noreferrer" className="button">
                        behance.net/wearerunes
                    </a>
                </div>
            </section>

            {/* Values */}
            <section id="values" className="relative pb-48">
                {/* Content */}
                <div className="relative container grid gap-20 z-10">
                    {/* Icons */}
                    <div className="flex justify-between items-center max-w-xl w-full mx-auto fill-yellow-light stroke-yellow-light">
                        {locale.values.lists.map((value, index) => (
                            <value.icon key={index} className="h-8 md:h-11" />
                        ))}
                    </div>

                    <Heading //
                        title={locale.values.title}
                        description={locale.values.description}
                    />

                    {/* List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full">
                        {locale.values.lists.map((value, index) => (
                            <article key={index} className="flex flex-col-reverse lg:flex-col justify-end lg:justify-between items-start">
                                {/* Description */}
                                <div className="grid gap-4">
                                    <h2 className="font-el-messiri text-4xl font-bold text-yellow-light">{value.title}</h2>
                                    <p className="paragraph text-white">{value.description}</p>
                                </div>

                                {/* Icon */}
                                <value.icon className="h-12 fill-yellow-light mb-10 lg:mb-0 lg:mt-14" />
                            </article>
                        ))}
                    </div>
                </div>

                {/* Pattern 1 */}
                <img src="/images/others/dots-horizontal.svg" alt="" className="dots-pattern top-0 left-0" />

                {/* Pattern 2 */}
                <img src="/images/others/dots-vertical.svg" alt="" className="dots-pattern bottom-0 right-0" />
            </section>

            {/* Clients */}
            <section id="clients" className="relative overflow-hidden">
                {/* Content */}
                <div className="relative container grid gap-20 z-30 pb-12">
                    <Heading //
                        title={locale.clients.title}
                        description={locale.clients.description}
                    />

                    {/* List */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 w-full group max-w-5xl mx-auto">
                        {clients.map((client, index) => (
                            <a
                                href={client.href}
                                title={client.name}
                                target="_blank"
                                rel="noreferrer"
                                key={index}
                                className="relative m-auto group-hover:opacity-50 hover:!opacity-100 duration-200 bg-opacity-75"
                            >
                                <img src={`/images/clients/${client.logoId}.png`} alt={client.name} className="w-64 lg:w-auto" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Logomark 1 */}
                <div className="hidden xl:block absolute w-24 bottom-0 left-0 z-20 transform translate-x-20 xl:translate-x-10 2xl:translate-x-24 3xl:translate-x-60 -translate-y-32">
                    <img src="/images/logo-mark.svg" alt="logo-mark" className="animate-[floating_5s_infinite_2s]" />
                </div>

                {/* Logomark 2 */}
                <div className="hidden lg:block absolute w-56 bottom-0 left-0 z-0 transform -translate-x-20 3xl:translate-x-10 -translate-y-96">
                    <img src="/images/logo-mark.svg" alt="logo-mark" className="animate-[floating_8s_infinite]" />
                </div>

                {/* Logomark 3 */}
                <img src="/images/logo-mark.svg" alt="logo-mark" className="hidden lg:block absolute max-w-xl w-full bottom-0 right-0 transform translate-x-48 translate-y-1/3 z-0" />

                {/* Divider */}
                <svg className="relative w-full object-cover fill-yellow-light z-10 -mb-1" viewBox="0 0 1920 265">
                    <path d="M0 0V130V265.5H1920V130V45.8333C1170.27 94.1662 749.881 86.466 0 0Z" />
                </svg>
            </section>

            {/* Contact */}
            <section id="contact" className="relative overflow-hidden from-yellow-light to-yellow-medium bg-gradient-to-b pb-24">
                {/* Content */}
                <div className="relative container z-20">
                    <div className="max-w-2xl ml-auto grid gap-12">
                        <Heading //
                            title={locale.contact.title}
                            description={locale.contact.description}
                            className={{
                                container: "!text-left !place-items-start !mx-0",
                                title: "!text-black",
                                description: "!text-black",
                            }}
                        />

                        <ContactForm />
                    </div>
                </div>

                <div className="hidden lg:block absolute h-full top-0 left-0 transform -translate-x-96 3xl:-translate-x-1/4 z-0">
                    <div className="h-full w-full z-10 absolute top-0 left-0" />
                    <img src="/images/others/rocket-horizontal.svg" alt="" className="xl:hidden animate-[floating_8s_infinite]" />
                    <img src="/images/others/rocket-skew.svg" alt="" className="hidden xl:block animate-[floating-45_8s_infinite]" />
                </div>
            </section>

            {/* Footer */}
            <section className="relative py-24 container">
                <Footer />
            </section>
        </main>
    );
};

export default memo(HomePage);
