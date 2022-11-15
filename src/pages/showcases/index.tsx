import Link from "next/link";
import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import CTA from "@/components/Sections/CTA";
import * as Button from "@/components/Forms/Buttons";

import { useCMSAPI, useLanguage } from "@/lib/hooks";
import { useState } from "react";
import * as localization from "@/lib/localization/pages/showcases";
import { encodeToURL } from "@/lib/functions";

export const useShowcasesAPI = (lang: string) => {
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

    const { data, loading } = useCMSAPI("/items/showcases", {
        defaultValue: [],
        skip: 0,
        fields: [
            {
                id: true,
                image_preview: true,
                image_cover: true,
                image_cover_placement_vertical: true,
                image_cover_placement_horizontal: true,
                product_title: true,
                translations: [
                    {
                        services: true,
                        languages_code: true,
                    },
                ],
            },
        ],
        filter: {
            status: "published",
        },
        sort: ["order"],
    });

    const showcases = data.map((item) => {
        const translations = item.translations.find((t) => t.languages_code === lang) || item.translations[0];

        return {
            ...item,
            ...translations,
        };
    });

    const categories = showcases.reduce((acc: string[], item) => {
        if (item.services) {
            item.services.map((service) => {
                if (!acc.includes(service)) {
                    acc.push(service);
                }
            });
        }

        return acc;
    }, []);

    const showcasesFiltered = showcases.filter((item) => {
        if (categoryFilters.length > 0) {
            for (const tag of item.services) {
                if (categoryFilters.includes(tag)) {
                    return true;
                }
            }

            return false;
        }

        return true;
    });

    return {
        loading,
        showcasesFiltered,
        categories,
        setCategoryFilters,
        categoryFilters,
    };
};

export default function ShowcasesPage() {
    const { locale, lang } = useLanguage("lang", localization);
    const { loading, categories, categoryFilters, setCategoryFilters, showcasesFiltered } = useShowcasesAPI(lang);

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-pink">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center max-w-2xl">
                        <h1 className="title">{locale.header.title}</h1>
                        <h2 className="subtitle">{locale.header.subtitle}</h2>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section>
                <div className="container grid gap-10 py-20">
                    <div className="flex flex-wrap items-center gap-3">
                        {!loading ? (
                            <>
                                <Button.Secondary //
                                    as="button"
                                    onClick={() => setCategoryFilters([])}
                                    active={categoryFilters.length === 0}
                                    className="capitalize animate-open"
                                >
                                    All
                                </Button.Secondary>

                                {categories.map((category, index) => (
                                    <Button.Secondary
                                        as="button"
                                        key={index}
                                        onClick={() => {
                                            if (!categoryFilters.includes(category)) {
                                                setCategoryFilters([...categoryFilters, category]);
                                            } else {
                                                setCategoryFilters(categoryFilters.filter((c) => c !== category));
                                            }
                                        }}
                                        active={categoryFilters.includes(category)}
                                        className="capitalize animate-open"
                                        style={{
                                            animationDelay: `${(index + 1) * 100}ms`,
                                        }}
                                    >
                                        {category}
                                    </Button.Secondary>
                                ))}
                            </>
                        ) : (
                            Array(4)
                                .fill(0)
                                .map((_, index) => (
                                    <Button.Secondary key={index} className="animate-pulse flex items-center h-12 w-20 bg-black bg-opacity-20" /> //
                                ))
                        )}
                    </div>

                    <hr className="border-black border-opacity-30" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {!loading
                            ? showcasesFiltered.map((item, index) => (
                                  <div
                                      className="relative h-full flip-card overflow-hidden group aspect-square animate-open" //
                                      key={item.id}
                                      style={{
                                          animationDelay: `${index * 100}ms`,
                                      }}
                                  >
                                      <img
                                          className="min-h-full min-w-full object-cover transform group-hover:scale-110 duration-200"
                                          src={`/assets/${item.image_preview || item.image_cover}.png`}
                                          alt={item.product_title}
                                          loading="lazy"
                                          style={{
                                              objectPosition: item.image_preview ? "center" : `${item.image_cover_placement_horizontal} ${item.image_cover_placement_vertical}`,
                                          }}
                                      />

                                      <div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 duration-200 grid gap-1 md:gap-4 auto-rows-max px-6 py-6 place-items-center place-content-center text-center">
                                          <Link href={`/showcases/${item.id}/${encodeToURL(item.product_title)}`}>
                                              <a className="text-yellow-light hover:opacity-75 duration-200" aria-label={item.product_title}>
                                                  <svg className="w-20 fill-yellow-light" viewBox="0 0 80 80">
                                                      <path d="M68 60H65.68L62.44 56.76C66.0347 51.91 67.983 46.0369 68 40C68 24.52 55.48 12 40 12C34 12 28 14 23.16 17.6C10.8 26.88 8.28 44.44 17.56 56.8C26.84 69.16 44.4 71.68 56.76 62.4L60 65.64V68L72 80H80V72L68 60ZM40 60C28.96 60 20 51.04 20 40C20 28.96 28.96 20 40 20C51.04 20 60 28.96 60 40C60 51.04 51.04 60 40 60ZM8 20L0 28V0H28L20 8H8V20ZM80 0V28L72 20V8H60L52 0H80ZM20 72L28 80H0V52L8 60V72H20Z" />
                                                  </svg>
                                              </a>
                                          </Link>
                                      </div>
                                  </div>
                              ))
                            : Array(4)
                                  .fill(0)
                                  .map((_, index) => <div className="relative h-full flip-card overflow-hidden group aspect-square bg-black bg-opacity-20 animate-pulse" key={index} />)}
                    </div>
                </div>
            </section>

            {/* Contact - CTA */}
            <CTA
                imageLink="/images/illustrations/treasure.png"
                className={{
                    wrapper: "bg-lime",
                    container: "items-center",
                    leftContainer: "xl:max-w-3xl",
                    image: "p-10",
                }}
            >
                <div className="container grid gap-5 text-center lg:text-left">
                    <h1 className="jumbo-title whitespace-pre-line">{locale.contact.title}</h1>
                    <p className="subtitle">{locale.contact.subtitle}</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mx-auto lg:mx-0">
                    <Link href={"/pricing"} passHref>
                        <Button.Primary>{locale.contact.button_1}</Button.Primary>
                    </Link>

                    <Link href={"/faq"} passHref>
                        <Button.Primary light className="bg-transparent">
                            {locale.contact.button_2}
                        </Button.Primary>
                    </Link>
                </div>
            </CTA>

            <Footer />
        </main>
    );
}
