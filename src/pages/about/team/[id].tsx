import type { GetServerSidePropsContext } from "next";

import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import * as Button from "@/components/Forms/Buttons";

import { useLanguage } from "@/lib/hooks";
import { fetchCMSAPI } from "@/lib/functions";
import * as localization from "@/lib/localization/pages/about/member";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const id = context.params.id as string;

    const data = await fetchCMSAPI(`/items/teams/${id}`, {
        skip: 0,
        defaultValue: {},
        deps: [id],
        fields: {
            name: true,
            image: true,
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
    });

    return {
        props: {
            data,
            seo: {
                subtitle: data.name,
                description: data.translations[0].short_description,
                image: `https://runes.asia/api/cms/assets/${data.image}`,
            },
        },
    };
};

export default function TeamMemberPage({ data }: { data: Awaited<ReturnType<typeof getServerSideProps>>["props"]["data"] }) {
    const { lang, locale } = useLanguage("lang", localization);

    const person = {
        ...data,
        ...data.translations?.filter((translation) => translation.languages_code === lang)[0],
    };

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20">
                <div className="container grid gap-28">
                    <Navigation />
                </div>
            </section>

            {/* Content */}
            <section className="relative pt-20 pb-40">
                <div className="container lg:max-w-screen-md xl:max-w-screen-lg grid gap-16 lg:grid-cols-2 z-10">
                    <div className="grid gap-8 text-black order-last lg:order-first auto-rows-max">
                        <Button.Back text={locale.backButton} href="/about" />

                        <section className="grid gap-3">
                            <h1 className="title">{person.name}</h1>
                            <h4 className="subtitle opacity-60">{person.job_title?.join(", ")}</h4>
                        </section>

                        <p className="font-poppins whitespace-pre-line text-justify">{person.long_description}</p>
                    </div>

                    <div className="xl:aspect-square w-full pt-10 flex justify-center items-end px-4" style={{ backgroundColor: person.theme_color }}>
                        <img src={`/api/cms/assets/${person.image}`} alt="" className="w-full md:max-w-xs lg:h-96 mx-auto object-contain object-bottom" />
                    </div>
                </div>

                <img src="/images/others/pattern-bottom-left.png" alt="" className="hidden md:block absolute bottom-0 left-0 h-64" />
                <img src="/images/others/pattern-bottom-right.png" alt="" className="absolute bottom-0 right-0 h-64" />
            </section>

            <Footer />
        </main>
    );
}
