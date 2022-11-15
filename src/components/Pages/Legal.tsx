import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import LangChooser from "@/components/Utils/LangChooser";

import moment from "moment";
import { useCMSAPI, useLanguage } from "@/lib/hooks";
import { theme } from "tailwind.config";

export const getStaticProps = async () => {
    return {
        props: {
            themeColor: theme.colors.white,
        },
    };
};

export default function LegalPage({ endpoint, localization }: { endpoint: `/${string}`; localization: any }) {
    const { locale, lang } = useLanguage("lang", localization);

    const { data, loading } = useCMSAPI(endpoint, {
        defaultValue: [],
        skip: 0,
        fields: {
            translations: [
                {
                    languages_code: true,
                    date_updated: true,
                    content: true,
                },
            ],
        },
    });

    const legal = data.translations?.find((item) => item.languages_code === lang);

    return (
        <main className="relative bg-white overflow-auto">
            {/* Header */}
            <section id="header" className="relative py-20">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center">
                        <LangChooser />

                        <h1 className="title">{locale.title}</h1>

                        <h2 className="subtitle">
                            {locale.date} <b>{!loading && moment(legal?.date_updated).format("MMMM DD, YYYY, HH:MM:SS")}</b>
                        </h2>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section id="content" className="relative pb-20">
                <div className="container grid gap-28 font-poppins">
                    {!loading ? ( //
                        <article className="prose mx-auto lg:max-w-3xl" dangerouslySetInnerHTML={{ __html: legal?.content }} />
                    ) : (
                        <div className="grid gap-6 mx-auto lg:max-w-3xl w-full">
                            {Array(8)
                                .fill(0)
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-4 bg-black bg-opacity-20 animate-pulse rounded-md"
                                        style={{
                                            width: `${Math.floor(Math.random() * (100 - 30 + 1) + 30)}%`,
                                        }}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
