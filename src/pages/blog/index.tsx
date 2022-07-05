import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import CTA from "@/components/Sections/CTA";
import * as Button from "@/components/Utils/Buttons";
import * as Icon from "@/components/Images/Icons";

import moment from "moment";
import { useState } from "react";
import { useLanguage, useAPI } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/blog";

type Article = {
    id: number;
    date_created: string;
    date_updated: string;
    user_created: {
        avatar: string;
        description: string;
        first_name: string;
        last_name: string;
        title: string;
    };
    user_updated: {
        avatar: string;
        description: string;
        first_name: string;
        last_name: string;
        title: string;
    };
    cover_image: string;
    title: string;
    tags: string[];
    short_description: string;
    content: string;
};

const BlogHeading = ({ articles }: { articles: Article[] }) => (
    <div className="flex flex-col xl:flex-row items-stretch gap-12 group">
        <a href={`/blog/${articles?.[0]?.id}`} className="grid place-content-start gap-7 group-hovered flex-1">
            <img src={articles?.[0]?.cover_image} alt={articles?.[0]?.title} className="flex-shrink h-96 w-full object-cover" />

            <div className="grid gap-4 text-white">
                <h1 className="text-4.5xl font-vidaloka leading-snug">{articles?.[0]?.title}</h1>
                <p className="subtitle max-h-full line-clamp-3">{articles?.[0]?.short_description}</p>
                <span className="opacity-60 font-poppins capitalize">
                    {articles?.[0]?.tags[0]} / {articles?.[0]?.date_created}
                </span>
            </div>

            <hr className="border-white opacity-30 xl:hidden" />
        </a>

        <div className="grid md:grid-cols-3 xl:grid-cols-1 gap-6 flex-1">
            {articles.slice(1, 4).map((article, index) => (
                <a key={index} href={`/blog/${article.id}`} className="flex flex-col xl:flex-row flex-shrink gap-6 group-hovered h-max">
                    <img src={article.cover_image} alt={article.title} className="xl:w-60 h-56 object-cover flex-shrink-0" />

                    <div className="grid gap-4 text-white">
                        <h1 className="text-3xl font-vidaloka leading-snug line-clamp-2">{article.title}</h1>
                        <p className="font-poppins max-h-20 line-clamp-3">{article.short_description}</p>
                        <span className="opacity-60 text-sm font-poppins capitalize">
                            {article.tags[0]} / {article.date_created}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    </div>
);

const BlogBody = ({ articles }: { articles: Article[] }) => (
    <div className="grid gap-6 xl:gap-11 md:grid-cols-3 group">
        {articles.map((article, index) => (
            <a key={index} href={`/blog/${article.id}`} className="grid gap-7 h-full place-content-start group-hovered">
                <img src={article.cover_image} alt={article.title} className="w-full h-64" />

                <div className="flex flex-col gap-4 text-black h-full">
                    <h1 className="text-3xl font-vidaloka leading-snug flex-1">{article.title}</h1>
                    <p className="h-full line-clamp-3 font-poppins">{article.short_description}</p>
                    <span className="opacity-60 font-poppins flex-1 text-sm capitalize">
                        {article.tags[0]} / {article.date_created}
                    </span>
                </div>
            </a>
        ))}
    </div>
);

export default function BlogPage() {
    const { lang, locale } = useLanguage("lang", localization);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [searchText, setSearchText] = useState("");

    const { data, loading } = useAPI<any[]>("GET", "/items/blogs", {
        skip: 0,
        defaultValue: [],
        sort: ["-date_created"],
        fields: {
            "*": true,
            user_created: {
                "*": true,
            },
            user_updated: {
                "*": true,
            },
            translations: {
                title: true,
                tags: true,
                content: true,
                languages_code: true,
                short_description: true,
            },
        },
    });

    const articles: Article[] = data.map((x) => {
        const translations = x.translations.filter((l) => l.languages_code === lang)[0] || x.translations[0];

        const merged = {
            tags: [],
            ...translations,
            ...x,
        };

        return {
            ...merged,
            cover_image: `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${merged.cover_image}`,
            tags: merged.tags.map((t) => t.toLowerCase()),
            date_created: moment(merged.date_created).format("DD MMMM YYYY"),
        };
    });

    const articleCategories = articles.reduce((previous, article) => {
        if (Array.isArray(article.tags)) {
            article.tags.forEach((tag) => {
                if (!previous.includes(tag)) {
                    previous.push(tag);
                }
            });
        }

        return previous;
    }, []);

    const articleMore = articles //
        .slice(4)
        .filter((article: Article) => {
            if (categoryFilters.length > 0) {
                for (const tag of article.tags) {
                    if (categoryFilters.includes(tag.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            }

            if (searchText.length > 0) {
                if (article.title.toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
                return false;
            }

            return true;
        });

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-black">
                <div className="container grid gap-14">
                    <Navigation light />
                    {!loading && <BlogHeading articles={articles} />}
                </div>
            </section>

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-6">
                    <div className="max-w-md flex gap-6 items-center text-black border border-black border-opacity-20 pl-5">
                        <Icon.Magnifier className="fill-current h-5" />
                        <input
                            type={"search"}
                            placeholder={locale.searchPlaceholder}
                            className="py-4 w-full outline-none font-poppins"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button.Secondary //
                            onClick={() => setCategoryFilters([])}
                            active={categoryFilters.length === 0}
                        >
                            All
                        </Button.Secondary>

                        {articleCategories.map((category, index) => (
                            <Button.Secondary
                                key={index}
                                onClick={() => {
                                    if (!categoryFilters.includes(category)) {
                                        setCategoryFilters([...categoryFilters, category]);
                                    } else {
                                        setCategoryFilters(categoryFilters.filter((c) => c !== category));
                                    }
                                }}
                                className="capitalize"
                                active={categoryFilters.includes(category)}
                            >
                                {category}
                            </Button.Secondary>
                        ))}
                    </div>

                    {!loading && <BlogBody articles={articleMore} />}
                </div>
            </section>

            {/* Join Newsletter */}
            <CTA
                imageLink="/images/illustrations/fireplace.png"
                className={{
                    wrapper: "bg-pink",
                    rightContainer: "xl:flex-shrink-0",
                    leftContainer: "text-black",
                    image: "xl:object-left",
                }}
            >
                <div className="grid gap-5">
                    <h1 className="jumbo-title whitespace-pre-line">{locale.newsletter.title}</h1>
                    <p className="subtitle text-justify">{locale.newsletter.subtitle}</p>
                </div>

                <form className="grid font-poppins max-w-xl">
                    <div className="w-full flex gap-6 items-center border border-black border-opacity-20 pl-5 bg-white">
                        <Icon.Mail className="fill-current h-5" />
                        <input type={"email"} placeholder="Your Email Account" className="py-4 w-full outline-none font-poppins" />
                    </div>

                    <Button.Primary className="!w-full !rounded-none">{locale.newsletter.button}</Button.Primary>
                </form>

                <p className="font-poppins">{locale.newsletter.notice}</p>
            </CTA>

            <Footer />
        </main>
    );
}
