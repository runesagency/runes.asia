import type { GetServerSidePropsContext } from "next";

import Footer from "@/components/Sections/Footer";
import Navigation from "@/components/Sections/Navigation";
import * as Button from "@/components/Forms/Buttons";

import { useLanguage } from "@/lib/hooks";
import { fetchCMSAPI } from "@/lib/functions";
import * as localization from "@/lib/localization/pages/showcases/single";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const id = context.params.id as string;

    const data = await fetchCMSAPI(`/items/showcases/${id}`, {
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

    return {
        props: {
            data,
            seo: {
                subtitle: data.product_title,
                description: data.translations[0].short_description,
                image: `https://runes.asia/api/cms/assets/${data.image_cover}`,
            },
        },
    };
};

export default function SingleShowcasePage({ data }: { data: Awaited<ReturnType<typeof getServerSideProps>>["props"]["data"] }) {
    const { lang, locale } = useLanguage("lang", localization);

    const showcase = {
        ...data,
        ...(data.translations?.find((t) => t.languages_code === lang) || data.translations?.[0]),
    };

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20">
                <div className="container grid gap-14 text-black">
                    <Navigation />

                    <hr className="border-black border-opacity-30" />

                    <Button.Back text={locale.backButton} href="/showcases" />

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
                </div>
            </section>

            {/* Image */}
            {
                <img
                    className="h-full w-full max-h-screen object-cover"
                    src={`/api/cms/assets/${showcase.image_cover}.png`}
                    alt=""
                    style={{
                        objectPosition: `${showcase.image_cover_placement_horizontal} ${showcase.image_cover_placement_vertical}` || "center",
                    }}
                />
            }

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-6 font-poppins text-black">
                    <div className="prose mx-auto lg:max-w-4xl" dangerouslySetInnerHTML={{ __html: showcase.content }} />
                    <Button.Back text={locale.backButton} href="/showcases" className="mx-auto" />
                </div>
            </section>

            <Footer />
        </main>
    );
}
