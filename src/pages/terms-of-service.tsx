import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";

import moment from "moment";
import { useCMSAPI, useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/terms-of-service";

export default function TermsOfServicePage() {
    const { locale, lang } = useLanguage("lang", localization);

    const { data, loading } = useCMSAPI("/items/terms_of_service", {
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

    const terms = data.translations?.find((item) => item.languages_code === lang);

    return (
        <main className="relative bg-white overflow-auto">
            {/* Header */}
            <section id="header" className="relative py-20">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center">
                        <h1 className="title">{locale.title}</h1>
                        <h4 className="subtitle">
                            {locale.date} <b>{!loading && moment(terms?.date_updated).format("MMMM DD, YYYY, HH:MM:SS")}</b>
                        </h4>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section id="content" className="relative pb-20">
                <div className="container grid gap-28 font-poppins">
                    {!loading && <article className="prose mx-auto lg:max-w-3xl" dangerouslySetInnerHTML={{ __html: terms?.content }} />}
                    {/*  */}
                </div>
            </section>

            <Footer />
        </main>
    );
}
