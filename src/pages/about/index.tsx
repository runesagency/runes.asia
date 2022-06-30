import { ReactNode, useEffect, useState } from "react";

import Link from "next/link";
import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";

import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/about";
import { theme } from "tailwind.config";

type DailyTimelineEvent = {
    date: string;
    title: string;
    description: string;
    dateBgColor?: string;
};

type TimelineData = {
    [key: string]: {
        [key: string]: DailyTimelineEvent[];
    };
};

const Timeline = ({ data }: { data: TimelineData }) => {
    const Yearly = ({ year, bgColor, children }: { year: string; bgColor: string; children: ReactNode }) => (
        <article className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
            <section className="text-black lg:w-24 text-center subtitle p-6 font-semibold flex-shrink-0" style={{ backgroundColor: bgColor }}>
                {year}
            </section>

            <div className="grid gap-3 pb-10 lg:py-10">{children}</div>
        </article>
    );

    const Monthly = ({ month, children }: { month: string; children: ReactNode }) => (
        <article className="grid gap-6">
            <h4 className="subtitle !font-vidaloka text-black">{month}</h4>

            <div className="grid gap-5">{children}</div>
        </article>
    );

    const Daily = (event: DailyTimelineEvent) => (
        <article className="flex gap-12">
            <p className="w-12 h-12 flex justify-center items-center text-black subtitle flex-shrink-0" style={{ backgroundColor: event.dateBgColor }}>
                {event.date}
            </p>

            <div className="grid gap-3 font-poppins">
                <h6 className="text-2xl">{event.title}</h6>
                <p>{event.description}</p>
            </div>
        </article>
    );

    return (
        <div className="grid max-w-6xl mx-auto">
            {Object.entries(data).map(([year, timeline], index) => {
                const colors = [theme.colors.lime, theme.colors.white, theme.colors.yellow.light];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                return (
                    <Yearly key={index} year={year} bgColor={randomColor}>
                        {Object.entries(timeline).map(([month, events], index) => (
                            <Monthly key={index} month={month}>
                                {events.map((event, index) => (
                                    <Daily key={index} dateBgColor={randomColor} {...event} />
                                ))}
                            </Monthly>
                        ))}
                    </Yearly>
                );
            })}
        </div>
    );
};

export default function AboutPage() {
    const { locale, lang } = useLanguage("lang", localization);
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/items/teams?fields=*.*`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((response) => {
                setTeams(response.data);
            });
    }, []);

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-contain bg-no-repeat bg-right-bottom bg-lime" style={{ backgroundImage: "url(/images/illustrations/windy.png)" }}>
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-11 text-black max-w-2xl">
                        <h1 className="jumbo-title whitespace-pre-line">{locale.header.title}</h1>

                        <div className="grid md:grid-cols-2 subtitle text-justify gap-10">
                            {locale.header.descriptions.map((text, index) => (
                                <p key={index}>{text}</p>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-16 pt-10 subtitle underline">
                            <a href="#about" className="hover:opacity-70 duration-300">
                                {locale.header.links[0]}
                            </a>
                            <a href="#journey" className="hover:opacity-70 duration-300">
                                {locale.header.links[1]}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20">
                <div className="container flex flex-col-reverse lg:flex-row items-center lg:items-stretch gap-16 xl:gap-44 justify-center">
                    <div className="grid gap-11 max-w-lg text-black auto-rows-max">
                        <h2 className="title">{locale.about.title}</h2>
                        <p className="font-poppins text-justify whitespace-pre-line">{locale.about.description}</p>
                    </div>

                    <img src="/images/others/store.png" alt="" className="h-96 lg:h-auto w-full lg:w-1/3 object-cover bg-bottom" />
                </div>
            </section>

            {/* Teams */}
            <section className="py-20">
                <div className="container grid gap-16 text-black">
                    <h2 className="title text-center">{locale.teams.title}</h2>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-11 w-full">
                        {teams.map((data, index) => {
                            type PersonData = {
                                id: number;
                                name: string;
                                job_title: string[];
                                short_description: string;
                                long_description: string;
                                theme_color: string;
                                image_id: string;
                            };

                            const person: PersonData = {
                                ...data,
                                ...data.translations.filter((translation: Record<string, any>) => translation.languages_code === lang)[0],
                                image_id: data.image.id,
                                id: data.id, // it was overlapped by the translation id before
                            };

                            return (
                                <article key={index} className="grid gap-7 w-full h-max">
                                    <div className="aspect-square w-full pt-10 flex justify-center items-end px-4" style={{ backgroundColor: person.theme_color }}>
                                        <img src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${person.image_id}`} alt="" className="h-80 mx-auto object-contain object-bottom" />
                                    </div>

                                    <div className="grid gap-4 font-poppins h-max">
                                        <h3 className="text-4xl font-bold">{person.name}</h3>
                                        <span className="text-sm opacity-70">{person.job_title.join(", ")}</span>
                                        <p className="text-justify">{person.short_description}</p>
                                    </div>

                                    <Link href={`/about/team/${person.id}`}>
                                        <a className="font-poppins border-b border-current w-max hover:opacity-70 duration-200 cursor-pointer h-max">
                                            {locale.teams.moreButton} {person.name.split(" ")[0]}
                                        </a>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="journey" className="pt-20 bg-navy text-white">
                <div className="container grid gap-12">
                    <h2 className="title text-center">{locale.journey.title}</h2>
                    <Timeline data={locale.journey.timelines} />
                </div>
            </section>
            <Footer />
        </main>
    );
}
