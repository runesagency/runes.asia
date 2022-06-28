import Link from "next/link";
import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import * as Button from "@/components/Utils/Buttons";

import { useLanguage, useDragToScroll } from "@/lib/hooks";
import { useEffect, useRef } from "react";
import * as localization from "@/lib/localization/pages/index";
import CTA from "@/components/Sections/CTA";

const Showcases = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    type Portofolio = {
        name: string;
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
                imageId: "naraetos",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.instagram.com/p/CbXQwI2p6AV/",
            },
            {
                name: "Runes Characters",
                imageId: "runes-characters",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.instagram.com/p/CbFBqLfJZ_f/",
            },
            {
                name: "Foxxy Hosting",
                imageId: "foxxy-hosting",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://www.behance.net/gallery/127128767/Project-Foxxy-Game-Hosting",
            },
            {
                name: "Tune Discord Bot Website",
                imageId: "tune-website",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://tunebot.org",
            },
            {
                name: "Foxxy Ecommerce",
                imageId: "foxxy-ecommerce",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://demo-ecommerce.runes.asia/home",
            },
            {
                name: "Feby Putri",
                imageId: "febyputri",
                imagePlacement: "top",
                columnSpan: 1,
                rowSpan: 2,
                link: "https://byncrecords.com",
            },
            {
                name: "Duta Bahasa Inggris",
                imageId: "dbibybriton",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 1,
                link: "https://dbi.britonenglish.co.id",
            },
            {
                name: "Rafly Maulana Site",
                imageId: "raflymln",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://raflymaulana.me",
            },
        ],
        [
            {
                name: "Harvport",
                imageId: "harvport",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 1,
                link: "https://harvport.com",
            },
            {
                name: "Madaya Group",
                imageId: "madaya",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://madayagroup.com",
            },
            {
                name: "Araloka Studios",
                imageId: "araloka",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 2,
                link: "https://aralokastudios.com",
            },
            {
                name: "Rawr, Drip, Splotch",
                imageId: "rawr-drip-splotch",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.behance.net/gallery/138534867/Style-Test-Vol2-Runes",
            },
            {
                name: "IndieSpices",
                imageId: "indiespices",
                imagePlacement: "top",
                columnSpan: 1,
                rowSpan: 2,
                link: "https://indiespices.com",
            },
            {
                name: "Genesi Visual",
                imageId: "genesi",
                imagePlacement: "top",
                columnSpan: 2,
                rowSpan: 1,
                link: "https://genesi.id",
            },
            {
                name: "Circle, Diamond, Heart",
                imageId: "circle-diamond-heart",
                columnSpan: 1,
                rowSpan: 1,
                link: "https://www.instagram.com/p/CbNGghep125/",
            },
        ],
    ];

    useDragToScroll(elementRef);

    useEffect(() => {
        const element: HTMLElement = elementRef.current;
        let isScrolling = true;
        let scrollDirection = "right";

        element.onmouseover = () => {
            isScrolling = false;
        };

        element.onmouseleave = () => {
            isScrolling = true;
        };

        const autoScroll = () => {
            if (!isScrolling) return;

            switch (scrollDirection) {
                case "right":
                    element.scrollBy(1, 0);

                    if (element.scrollLeft >= element.scrollWidth - element.clientWidth - 5) {
                        scrollDirection = "left";
                    }
                    break;

                case "left":
                    element.scrollBy(-1, 0);

                    if (element.scrollLeft <= 0) {
                        scrollDirection = "right";
                    }
            }
        };

        setInterval(autoScroll, 30);

        return () => {
            element.onmouseover = null;
            element.onmouseleave = null;
        };
    }, []);

    return (
        <div ref={elementRef} className="max-w-full cursor-move overflow-x-auto no-scrollbar will-change-scroll">
            <section className="relative grid grid-cols-2 w-max gap-4 xl:gap-6">
                {portfolios.map((row, index) => (
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

                                    <div
                                        className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 duration-200 grid gap-1 md:gap-4 auto-rows-max px-6 py-6 place-items-center place-content-center text-center"
                                        title={portfolio.name}
                                    >
                                        <a
                                            className="font-lora text-base underline text-yellow-light font-bold tracking-wide hover:opacity-75 duration-200"
                                            href={portfolio.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <svg className="w-20 fill-yellow-light" viewBox="0 0 80 80">
                                                <path d="M68 60H65.68L62.44 56.76C66.0347 51.91 67.983 46.0369 68 40C68 24.52 55.48 12 40 12C34 12 28 14 23.16 17.6C10.8 26.88 8.28 44.44 17.56 56.8C26.84 69.16 44.4 71.68 56.76 62.4L60 65.64V68L72 80H80V72L68 60ZM40 60C28.96 60 20 51.04 20 40C20 28.96 28.96 20 40 20C51.04 20 60 28.96 60 40C60 51.04 51.04 60 40 60ZM8 20L0 28V0H28L20 8H8V20ZM80 0V28L72 20V8H60L52 0H80ZM20 72L28 80H0V52L8 60V72H20Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                ))}
            </section>
        </div>
    );
};

export default function HomePage() {
    const { locale } = useLanguage("lang", localization);

    const clients = [
        {
            name: "Tune Discord Bot",
            logoId: "tune",
            href: "https://tunebot.org",
        },
        {
            name: "Green Discord Bot",
            logoId: "green-bot",
            href: "https://green-bot.app/",
        },
        {
            name: "Duta Bahasa Inggris By Briton",
            logoId: "dbibybriton",
            href: "https://dbi.britonenglish.co.id/",
        },
        {
            name: "Briton English Education",
            logoId: "briton",
            href: "https://britonenglish.co.id/",
        },
        {
            name: "Indiespices",
            logoId: "indiespices",
            href: "https://indiespices.com/",
        },
        {
            name: "Harvport",
            logoId: "harvport",
            href: "https://harvport.com/",
        },
        {
            name: "Feby Putri",
            logoId: "febyputri",
            href: "https://byncrecords.com/",
        },
        {
            name: "Araloka Studios",
            logoId: "araloka",
            href: "https://aralokastudios.com/",
        },
        {
            name: "Madaya Group",
            logoId: "madaya",
            href: "https://madayagroup.com/",
        },
    ];

    const characters = [
        "Sultan", //
        "Rafly",
        "Dayven",
        "Yoga",
    ];

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-contain bg-no-repeat bg-right-bottom bg-yellow-light" style={{ backgroundImage: "url(/images/illustrations/hand-rising.png)" }}>
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black">
                        <h1 className="jumbo-title whitespace-pre-line">{locale.header.content.title}</h1>
                        <h4 className="subtitle text-justify max-w-lg">{locale.header.content.description}</h4>

                        <Link href={"/pricing"} passHref>
                            <Button.Primary>{locale.header.content.button}</Button.Primary>
                        </Link>
                    </div>

                    <div className="flex gap-14 font-poppins text-black flex-wrap">
                        {locale.header.statistics.map(({ label, value }, index) => (
                            <div key={index} className="flex flex-col items-center gap-4">
                                <h3 className="font-bold text-5xl">{value}</h3>
                                <p className="text-2xl whitespace-pre-line text-center">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="pt-36 relative">
                <div className="container grid gap-12 text-center z-10">
                    <h1 className="title">{locale.about.title}</h1>

                    <p className="text-2xl font-poppins max-w-4xl mx-auto leading-normal">
                        <b>{locale.about.description[0]}</b>
                        {locale.about.description[1]}
                    </p>

                    <Link href={"/about"} passHref>
                        <Button.Primary className="mx-auto">{locale.about.button}</Button.Primary>
                    </Link>
                </div>

                <div className="relative flex justify-center -space-x-10 mx-auto w-full z-10 pt-12">
                    {characters.map((character, index) => (
                        <img key={index} src={`/images/characters/${character}.png`} className="max-h-44 md:max-h-72 h-auto" alt={character} />
                    ))}
                </div>

                <svg className="absolute bottom-0 left-0 fill-lime opacity-40" viewBox="0 0 1920 266">
                    <path d="M0 0V130V265.5H1920V130V45.8333C1170.27 94.1662 749.881 86.466 0 0Z" />
                </svg>
            </section>

            {/* Clients */}
            <section className="py-20 bg-lime">
                <div className="container grid gap-12 text-center z-10">
                    <p className="subtitle">{locale.clients.subtitle}</p>

                    <div className="group max-w-6xl grid grid-cols-2 md:grid-cols-3 xl:flex flex-wrap gap-8 md:gap-10 justify-between mx-auto">
                        {clients.map(({ name, logoId, href }) => (
                            <a key={name} href={href} target="_blank" rel="noreferrer" className="flex justify-center items-center flex-shrink-0">
                                <img src={`/images/clients/${logoId}.png`} className="max-h-14 group-hovered" alt={name} />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intro - CTA */}
            <CTA imageLink="/images/illustrations/falling.png" className={{ wrapper: "bg-pink" }}>
                <img src="/images/others/tagline.svg" alt="tagline" className="w-full" />
                <p className="subtitle text-justify">{locale.intro.text}</p>

                <Link href="/pricing" passHref>
                    <Button.Primary>{locale.intro.button}</Button.Primary>
                </Link>
            </CTA>

            {/* Services */}
            <section className="pt-36 pb-20 relative">
                <div className="container grid gap-12 z-10">
                    <div className="grid gap-5 text-center">
                        <h1 className="title">{locale.services.title}</h1>
                        <h4 className="subtitle">{locale.services.subtitle}</h4>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4">
                        {locale.services.list.map(({ name, description, services }) => (
                            <div key={name} className="grid gap-5 px-9 py-20 border-black border border-opacity-20 text-black font-poppins">
                                <img src={`/images/illustrations/services/${name}.png`} alt={name} className="w-full" />
                                <h3 className="text-3xl font-vidaloka">{name}</h3>
                                <p className="text-justify">{description}</p>

                                <div className="grid gap-3">
                                    {services.map((service, index) => (
                                        <article key={index} className="flex gap-2">
                                            <svg className="fill-lime flex-shrink-0 w-4" viewBox="0 0 18 18">
                                                <path d="M15.8994 1.32533C13.5265 3.37901 11.5189 5.33398 9.68095 7.88464C8.87038 9.00964 7.96898 10.3338 7.37976 11.5839C7.04338 12.2468 6.43701 13.2827 6.23029 14.2786C5.09966 13.2267 3.88523 12.0328 2.64266 11.0976C1.75701 10.4314 -0.79393 11.7898 0.244445 12.5711C2.10548 13.9709 3.6532 15.7144 5.46332 17.1766C6.22045 17.7875 7.89838 16.4608 8.2927 15.9042C9.58701 14.0705 9.76391 11.8289 10.7072 9.82864C12.1475 6.76948 14.7018 4.25651 17.2238 2.07429C18.8947 0.515888 17.1689 0.228451 15.9019 1.32533" />
                                            </svg>

                                            <p>{service}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcases */}
            <section className="py-20 relative grid gap-12">
                <div className="container grid gap-5 text-center">
                    <h1 className="title">{locale.showcases.title}</h1>
                    <h4 className="subtitle">{locale.showcases.subtitle}</h4>
                </div>

                <Showcases />

                <Link href={"/showcases"} replace passHref>
                    <Button.Primary className="mx-auto">{locale.showcases.button}</Button.Primary>
                </Link>
            </section>

            {/* Contact */}
            <section className="py-20 relative bg-yellow-light">
                <div className="container grid gap-10">
                    <div className="grid gap-5 text-center">
                        <h1 className="jumbo-title whitespace-pre-line">{locale.contact.title}</h1>
                        <p className="subtitle">{locale.contact.subtitle}</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mx-auto">
                        <Link href={"/pricing"} passHref>
                            <Button.Primary>{locale.contact.button_1}</Button.Primary>
                        </Link>

                        <Link href={"/faq"} passHref>
                            <Button.Primary light className="bg-transparent">
                                {locale.contact.button_2}
                            </Button.Primary>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
