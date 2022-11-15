import type { GetServerSidePropsContext } from "next";

import Footer from "@/components/Sections/Footer";
import Navigation from "@/components/Sections/Navigation";
import NewsletterCTA from "@/components/Sections/NewsletterCTA";
import * as Button from "@/components/Forms/Buttons";

import moment from "moment";
import { useRouter } from "next/router";
import { encodeToURL, fetchCMSAPI } from "@/lib/functions";
import { useLanguage } from "@/lib/hooks";
import { theme } from "tailwind.config";
import * as localization from "@/lib/localization/pages/blog/single";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const slugs = context.query.slug;
    const id = slugs[0];
    const slug = slugs[1];

    const data = await fetchCMSAPI(`/items/blogs/${id}`, {
        skip: 0,
        defaultValue: {},
        deps: [id],
        fields: {
            id: true,
            cover_image: true,
            user_created: "*",
            date_created: true,
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
    });

    const translation = data.translations.find((translation) => encodeToURL(translation.title) === slug) || {};

    return {
        props: {
            themeColor: theme.colors.black,
            data: {
                ...data,
                lang: translation.languages_code,
                ...translation,
            },
            seo: {
                subtitle: translation?.title,
                description: translation?.short_description,
                image: `https://runes.asia/assets/${data.cover_image}`,
            },
        },
    };
};

export default function SingleBlogPage({ data }: { data: Awaited<ReturnType<typeof getServerSideProps>>["props"]["data"] }) {
    const router = useRouter();
    const { lang, locale, onLanguageChange } = useLanguage("lang", localization);

    onLanguageChange.current = (newLang) => {
        if (newLang !== lang) {
            const newBlog = data.translations?.find((translation) => translation.languages_code === newLang);
            router.replace(`/blog/${data.id}/${encodeToURL(newBlog.title)}`);
        }
    };

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-black">
                <div className="container grid gap-14">
                    <Navigation light />

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                        <div className="flex flex-col justify-between gap-24">
                            <div className="grid gap-7 text-white">
                                <Button.Back text={locale.backButton} href="/blog" light />
                                <h1 className="title">{data.title}</h1>
                                <h2 className="subtitle">{data.short_description}</h2>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Button.Secondary as="button" active light className="bg-yellow-light">
                                    {data.user_created?.first_name} {data.user_created?.last_name}
                                </Button.Secondary>

                                <Button.Secondary as="button" light>
                                    {moment(data.date_created).format("MMMM DD, YYYY")}
                                </Button.Secondary>

                                {data.tags?.map((tag: string, index: number) => (
                                    <Button.Secondary as="button" key={index} light className="capitalize">
                                        {tag.toLowerCase()}
                                    </Button.Secondary>
                                ))}
                            </div>
                        </div>

                        <img src={`/assets/${data.cover_image}`} alt="" className="h-full w-full object-cover max-h-72 lg:max-h-full order-first lg:order-none" loading="lazy" />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-6 prose lg:max-w-4xl font-poppins text-black">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    <Button.Back text={locale.backButton} href="/blog" className="mx-auto" />
                </div>
            </section>

            <NewsletterCTA />

            <Footer />
        </main>
    );
}
