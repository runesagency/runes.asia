import Link from "next/link";
import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import NewsletterCTA from "@/components/Sections/NewsletterCTA";
import Input from "@/components/Forms/Input";
import * as Button from "@/components/Forms/Buttons";
import * as Icon from "@/components/Utils/Icons";

import moment from "moment";
import { useState } from "react";
import { useLanguage, useCMSAPI } from "@/lib/hooks";
import { encodeToURL } from "@/lib/functions";
import * as localization from "@/lib/localization/pages/blog";

export const useBlogAPI = (lang: string) => {
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [search, setSearchText] = useState("");

    const { data, loading } = useCMSAPI("/items/blogs", {
        skip: 0,
        defaultValue: [],
        sort: ["-date_created"],
        fields: [
            {
                id: true,
                user_created: "*",
                user_updated: "*",
                date_created: true,
                cover_image: true,
                translations: [
                    {
                        title: true,
                        tags: true,
                        content: true,
                        languages_code: true,
                        short_description: true,
                    },
                ],
            },
        ],
        filter: {
            status: "published",
        },
    });

    const articles = data //
        .map((x) => {
            const translations = x.translations.filter((l) => l.languages_code === lang)[0] || x.translations[0];

            const merged = {
                ...translations,
                ...x,
            };

            return {
                ...merged,
                cover_image: `/api/cms/assets/${merged.cover_image}`,
                tags: merged.tags?.map((t) => t.toLowerCase()) || [],
                date_created: moment(merged.date_created).format("DD MMMM YYYY"),
            };
        });

    const articleCategories = articles //
        .reduce((previous, article) => {
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
        .filter((article) => {
            if (categoryFilters.length > 0) {
                for (const tag of article.tags) {
                    if (categoryFilters.includes(tag.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            }

            if (search.length > 0) {
                if (article.title.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
                return false;
            }

            return true;
        });

    return {
        articles,
        categoryFilters,
        setCategoryFilters,
        articleCategories,
        articleMore,
        setSearchText,
        loading,
    };
};

type Article = ReturnType<typeof useBlogAPI>["articles"];

const blogURL = (article: Article[0]) => `/blog/${article.id}/${encodeToURL(article.title)}`;

const BlogHeading = ({ articleList }: { articleList: Article }) => (
    <div className="flex flex-col xl:flex-row items-stretch gap-12 group">
        <Link href={blogURL(articleList?.[0])} passHref>
            <a className="grid place-content-start gap-7 group-hovered flex-1">
                <img src={articleList?.[0]?.cover_image} alt={articleList?.[0]?.title} className="flex-shrink h-96 w-full object-cover object-center" loading="lazy" />

                <div className="grid gap-4 text-white">
                    <h1 className="text-4.5xl font-vidaloka leading-snug">{articleList?.[0]?.title}</h1>
                    <p className="subtitle max-h-full line-clamp-3">{articleList?.[0]?.short_description}</p>
                    <span className="opacity-75 font-poppins capitalize">
                        {articleList?.[0]?.tags[0]} / {articleList?.[0]?.date_created}
                    </span>
                </div>

                <hr className="border-white opacity-30 xl:hidden" />
            </a>
        </Link>

        <div className="grid md:grid-cols-3 xl:grid-cols-1 gap-6 flex-1">
            {articleList.slice(1, 4).map((article, index) => (
                <Link key={index} href={blogURL(article)} passHref>
                    <a className="flex flex-col xl:flex-row flex-shrink gap-6 group-hovered h-max">
                        <img src={article.cover_image} alt={article.title} className="xl:w-60 h-56 object-cover object-center flex-shrink-0" loading="lazy" />

                        <div className="grid gap-4 text-white">
                            <h1 className="text-3xl font-vidaloka leading-snug line-clamp-2">{article.title}</h1>
                            <p className="font-poppins max-h-20 line-clamp-3">{article.short_description}</p>
                            <span className="opacity-75 text-sm font-poppins capitalize">
                                {article.tags[0]} / {article.date_created}
                            </span>
                        </div>
                    </a>
                </Link>
            ))}
        </div>
    </div>
);

const BlogBody = ({ articleList: articleList }: { articleList: Article }) => (
    <div className="grid gap-6 xl:gap-11 md:grid-cols-3 group">
        {articleList.map((article, index) => (
            <Link passHref key={index} href={blogURL(article)}>
                <a className="grid gap-7 h-full place-content-start group-hovered">
                    <img src={article.cover_image} alt={article.title} className="w-full h-64 object-cover object-center" loading="lazy" />

                    <div className="flex flex-col gap-4 text-black h-full">
                        <h1 className="text-3xl font-vidaloka leading-snug flex-1">{article.title}</h1>
                        <p className="h-full line-clamp-3 font-poppins">{article.short_description}</p>
                        <span className="opacity-75 font-poppins flex-1 text-sm capitalize">
                            {article.tags[0]} / {article.date_created}
                        </span>
                    </div>
                </a>
            </Link>
        ))}
    </div>
);

export default function BlogPage() {
    const { lang, locale } = useLanguage("lang", localization);
    const { articles, setCategoryFilters, articleMore, loading, setSearchText, categoryFilters, articleCategories } = useBlogAPI(lang);

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-black">
                <div className="container grid gap-14">
                    <Navigation light />
                    {!loading ? ( //
                        <BlogHeading articleList={articles} />
                    ) : (
                        <Icon.Loader className="h-32 mx-auto fill-white col-span-full" />
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-6">
                    <Input
                        icon="Magnifier"
                        type={"search"}
                        className="max-w-md"
                        placeholder={locale.searchPlaceholder}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />

                    <div className="flex flex-wrap items-center gap-3">
                        <Button.Secondary //
                            as="button"
                            onClick={() => setCategoryFilters([])}
                            active={categoryFilters.length === 0}
                        >
                            All
                        </Button.Secondary>

                        {articleCategories.map((category, index) => (
                            <Button.Secondary
                                key={index}
                                as="button"
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

                    {!loading ? ( //
                        <BlogBody articleList={articleMore} />
                    ) : (
                        <Icon.Loader className="h-32 mx-auto fill-black col-span-full" />
                    )}
                </div>
            </section>

            <NewsletterCTA />

            <Footer />
        </main>
    );
}
