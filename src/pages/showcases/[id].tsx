import Head from "next/head";
import Footer from "@/components/Sections/Footer";
import Navigation from "@/components/Sections/Navigation";
import * as Button from "@/components/Forms/Buttons";

import { useRouter } from "next/router";
import { useCMSAPI, useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/showcases/single";

export const useSingleShowcaseAPI = (lang: string, id: number) => {
    const { data, loading } = useCMSAPI(`/items/showcases/${id}`, {
        defaultValue: [],
        skip: 0,
        deps: [id],
        fields: {
            product_title: true,
            image_cover: true,
            image_cover_placement_vertical: true,
            image_cover_placement_horizontal: true,
            client: true,
            translations: [
                {
                    services: true,
                    languages_code: true,
                    content: true,
                    short_description: true,
                },
            ],
            links: [
                {
                    title: true,
                    href: true,
                },
            ],
        },
    });

    const showcase = {
        ...data,
        ...(data.translations?.find((t) => t.languages_code === lang) || data.translations?.[0]),
    };

    return {
        loading,
        showcase,
    };
};

export default function SingleShowcasePage() {
    const router = useRouter();

    const { lang, locale } = useLanguage("lang", localization);
    const { id } = router.query;

    const { loading, showcase } = useSingleShowcaseAPI(lang, Number(id));

    return (
        <main className="relative bg-white">
            <Head>
                <title>{showcase.product_title} | Runes - Showcases</title>
            </Head>

            {/* Header */}
            <section className="relative py-20">
                <div className="container grid gap-14 text-black">
                    <Navigation />

                    <hr className="border-black border-opacity-30" />

                    <Button.Back text={locale.backButton} href="/showcases" />

                    {!loading && (
                        <>
                            <h1 className="title">{showcase.product_title}</h1>

                            <div className="grid xl:grid-cols-2 gap-10">
                                <p className="font-poppins text-justify max-w-lg xl:max-w-none">{showcase.short_description}</p>

                                <div className="flex flex-col md:flex-row gap-8 xl:gap-14 xl:justify-end items-start flex-wrap">
                                    <div className="grid gap-2 h-max max-w-[5rem]">
                                        <h3 className="font-vidaloka text-2xl">{locale.projectInfo.client}</h3>
                                        <p className="font-poppins">{showcase.client}</p>
                                    </div>

                                    <div className="grid gap-2 h-max max-w-[10rem]">
                                        <h3 className="font-vidaloka text-2xl">{locale.projectInfo.works}</h3>

                                        <ul className="font-poppins list-disc">
                                            {showcase.services?.map((service: string, index: number) => (
                                                <li key={index} className="ml-7">
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="grid gap-2 h-max max-w-[10rem]">
                                        <h3 className="font-vidaloka text-2xl">{locale.projectInfo.links}</h3>

                                        <ul className="font-poppins list-disc">
                                            {showcase.links?.map((link, index) => (
                                                <li key={index} className="ml-7">
                                                    <a href={link.href} className="underline hover:opacity-70 duration-200">
                                                        {link.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Image */}
            {!loading && (
                <img
                    className="h-full w-full max-h-screen object-cover"
                    src={`/api/cms/assets/${showcase.image_cover}.png`}
                    alt=""
                    style={{
                        objectPosition: `${showcase.image_cover_placement_horizontal} ${showcase.image_cover_placement_vertical}` || "center",
                    }}
                />
            )}

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-6 font-poppins text-black">
                    {!loading && <div className="prose mx-auto lg:max-w-4xl" dangerouslySetInnerHTML={{ __html: showcase.content }} />}
                    <Button.Back text={locale.backButton} href="/showcases" className="mx-auto" />
                </div>
            </section>

            <Footer />
        </main>
    );
}
