import type { ReactNode } from "react";

import Link from "next/link";
import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";

import { theme } from "tailwind.config";
import { useCMSAPI, useLanguage } from "@/lib/hooks";
import { encodeToURL } from "@/lib/functions";
import * as localization from "@/lib/localization/pages/about";

export const getStaticProps = async () => {
    return {
        props: {
            themeColor: theme.colors.green,
        },
    };
};

export const useAboutAPI = (lang: string) => {
    const { data, loading } = useCMSAPI("/users", {
        skip: 0,
        defaultValue: [],
        fields: [
            {
                id: true,
                first_name: true,
                last_name: true,
                avatar: true,
                theme_color: true,
                translations: [
                    {
                        languages_code: true,
                        job_title: true,
                        short_description: true,
                        long_description: true,
                    },
                ],
            },
        ],
        filter: {
            status: "active",
        },
    });

    const teams = data.map((person) => ({
        name: person.first_name + " " + person.last_name,
        ...person,
        ...person.translations.filter((translation) => translation.languages_code === lang)[0],
    }));

    return {
        loading,
        teams,
    };
};

export default function AboutPage() {
    const { locale, lang } = useLanguage("lang", localization);
    const { loading, teams } = useAboutAPI(lang);

    const Timeline = ({ data }: { data: typeof locale.journey.timelines }) => {
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

        const Daily = (event: typeof data["2021"]["November"][0] & { dateBgColor: string }) => (
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
                    const colors = [theme.colors.green, theme.colors.white, theme.colors.yellow.light];
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

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-contain bg-no-repeat bg-right-bottom bg-green" style={{ backgroundImage: "url(/images/illustrations/windy.png)" }}>
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
                    <div className="grid gap-11 max-w-lg text-black auto-rows-max py-10">
                        <h2 className="title">{locale.about.title}</h2>
                        <p className="font-poppins text-justify whitespace-pre-line">{locale.about.description}</p>
                    </div>

                    <img src="/images/others/store.png" alt="" className="h-96 lg:h-auto w-full lg:w-1/3 object-cover object-center" />
                </div>
            </section>

            {/* Teams */}
            <section className="py-20">
                <div className="container grid gap-16 text-black">
                    <h2 className="title text-center">{locale.teams.title}</h2>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-11 w-full">
                        {!loading
                            ? teams.map((person, index) => {
                                  return (
                                      <article key={index} className="grid gap-7 w-full h-max animate-open" style={{ animationDelay: `${index * 0.1}s` }}>
                                          <div className="aspect-square w-full pt-10 flex justify-center items-end px-4" style={{ backgroundColor: person.theme_color }}>
                                              <img src={`/assets/${person.avatar}`} alt="" className="h-80 mx-auto object-contain object-bottom" />
                                          </div>

                                          <div className="grid gap-4 font-poppins h-max">
                                              <h3 className="text-4xl font-bold">{person.name}</h3>
                                              <span className="text-sm opacity-70">{person.job_title.join(", ")}</span>
                                              <p>{person.short_description}</p>
                                          </div>

                                          <Link
                                              href={`/about/team/${person.id}/${encodeToURL(person.name)}`}
                                              className="font-poppins border-b border-current w-max hover:opacity-70 duration-200 cursor-pointer h-max"
                                          >
                                              {locale.teams.moreButton} {person.name.split(" ")[0]}
                                          </Link>
                                      </article>
                                  );
                              })
                            : Array(4)
                                  .fill(0)
                                  .map((_, index) => (
                                      <article key={index} className="grid gap-7 w-full h-max animate-pulse">
                                          <div className="aspect-square w-full pt-10 flex justify-center items-end px-4 bg-gray" />

                                          <div className="grid gap-4 font-poppins h-max">
                                              <div className="h-5 w-2/3 bg-gray rounded-md" />
                                              <div className="h-2 w-1/2 bg-gray rounded-md" />
                                          </div>
                                      </article>
                                  ))}
                    </div>
                </div>
            </section>

            <section id="journey" className="pt-20 bg-blue-dark text-white">
                <div className="container grid gap-12">
                    <h2 className="title text-center">{locale.journey.title}</h2>
                    <Timeline data={locale.journey.timelines} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
