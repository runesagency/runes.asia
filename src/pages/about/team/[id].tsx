import Link from "next/link";
import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import * as Icon from "@/components/Images/Icons";

import { useRouter } from "next/router";
import { useAPI, useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/about/member";

export default function TeamMemberPage() {
    const { lang, locale } = useLanguage("lang", localization);
    const router = useRouter();
    const { id } = router.query;

    const { data, loading } = useAPI<any>("GET", `/items/teams/${id}`, {
        skip: 0,
        defaultValue: {},
        fields: {
            name: true,
            image: true,
            theme_color: true,
            translations: {
                languages_code: true,
                job_title: true,
                short_description: true,
                long_description: true,
            },
        },
    });

    type PersonData = {
        id: number;
        name: string;
        job_title: string[];
        short_description: string;
        long_description: string;
        theme_color: string;
        image: string;
    };

    const person: PersonData = {
        ...data,
        ...data.translations?.filter((translation: Record<string, any>) => translation.languages_code === lang)[0],
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
            {!loading && (
                <section className="relative pt-20 pb-40">
                    <div className="container lg:max-w-screen-md xl:max-w-screen-lg grid gap-16 lg:grid-cols-2 z-10">
                        <div className="grid gap-8 text-black order-last lg:order-first auto-rows-max">
                            <Link href={`/about`}>
                                <a className="flex items-center gap-4 hover:underline hover:opacity-70">
                                    <Icon.ChevronLeft className="stroke-current h-4 fill-transparent" />
                                    <p className="font-poppins">{locale.backButton}</p>
                                </a>
                            </Link>

                            <section className="grid gap-3">
                                <h1 className="title">{person.name}</h1>
                                <h4 className="subtitle opacity-60">{person.job_title?.join(", ")}</h4>
                            </section>

                            <p className="font-poppins whitespace-pre-line text-justify">{person.long_description}</p>
                        </div>

                        <div className="xl:aspect-square w-full pt-10 flex justify-center items-end px-4" style={{ backgroundColor: person.theme_color }}>
                            <img src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${person.image}`} alt="" className="w-full md:max-w-xs lg:h-96 mx-auto object-contain object-bottom" />
                        </div>
                    </div>

                    <img src="/images/others/pattern-bottom-left.png" alt="" className="hidden md:block absolute bottom-0 left-0 h-64" />
                    <img src="/images/others/pattern-bottom-right.png" alt="" className="absolute bottom-0 right-0 h-64" />
                </section>
            )}

            <Footer />
        </main>
    );
}
