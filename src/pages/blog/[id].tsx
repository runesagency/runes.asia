import Head from "next/head";
import Footer from "@/components/Sections/Footer";
import Navigation from "@/components/Sections/Navigation";
import NewsletterCTA from "@/components/Sections/NewsletterCTA";
import * as Button from "@/components/Forms/Buttons";

import moment from "moment";
import { useRouter } from "next/router";
import { useCMSAPI, useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/blog/single";

export const useSingleBlogAPI = (lang: string, id: number) => {
    const { data, loading } = useCMSAPI(`/items/blogs/${id}`, {
        skip: 0,
        defaultValue: {},
        deps: [id],
        fields: {
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

    const blog = {
        ...data,
        ...(data.translations?.find((translation) => translation.languages_code === lang) || data.translations?.[0]),
    };

    return {
        loading,
        blog,
    };
};

export default function SingleBlogPage() {
    const router = useRouter();

    const { lang, locale } = useLanguage("lang", localization);
    const { id } = router.query;

    const { loading, blog } = useSingleBlogAPI(lang, Number(id));

    return (
        <main className="relative bg-white">
            <Head>
                <title>{blog.title} | Runes - Blog</title>
            </Head>

            {/* Header */}
            <section className="relative py-20 bg-black">
                <div className="container grid gap-14">
                    <Navigation light />

                    {!loading && (
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                            <div className="flex flex-col justify-between gap-24">
                                <div className="grid gap-7 text-white">
                                    <Button.Back text={locale.backButton} href="/blog" light />
                                    <h1 className="title">{blog.title}</h1>
                                    <h3 className="subtitle">{blog.short_description}</h3>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <Button.Secondary active light className="bg-yellow-light">
                                        {blog.user_created?.first_name} {blog.user_created?.last_name}
                                    </Button.Secondary>

                                    <Button.Secondary light>{moment(blog.date_created).format("MMMM DD, YYYY")}</Button.Secondary>

                                    {blog.tags?.map((tag: string, index: number) => (
                                        <Button.Secondary key={index} light className="capitalize">
                                            {tag.toLowerCase()}
                                        </Button.Secondary>
                                    ))}
                                </div>
                            </div>

                            <img src={`/api/cms/assets/${blog.cover_image}`} alt="" className="h-full w-full object-cover max-h-72 lg:max-h-full order-first lg:order-none" />
                        </div>
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-6 prose lg:max-w-4xl font-poppins text-black">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    <Button.Back text={locale.backButton} href="/blog" className="mx-auto" />
                </div>
            </section>

            <NewsletterCTA />

            <Footer />
        </main>
    );
}
