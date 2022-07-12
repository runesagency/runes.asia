import Link from "next/link";
import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import * as Button from "@/components/Forms/Buttons";
import * as Icon from "@/components/Utils/Icons";

import { theme } from "tailwind.config";
import { useState } from "react";
import { useCMSAPI, useLanguage } from "@/lib/hooks";
import { useFAQsAPI } from "@/pages/faq";
import * as localization from "@/lib/localization/pages/pricing";

export const usePricingsAPI = (lang: string) => {
    const { data, loading } = useCMSAPI("/items/pricings", {
        defaultValue: [],
        skip: 0,
        fields: [
            {
                image: true,
                billing_period: true,
                category: {
                    category_image: true,
                    translations: [
                        {
                            languages_code: true,
                            name: true,
                        },
                    ],
                },
                translations: [
                    {
                        languages_code: true,
                        title: true,
                        price: true,
                        key_features: true,
                        features_included: true,
                        features_not_included: true,
                        short_description: true,
                    },
                ],
            },
        ],
        filter: {
            status: "published",
        },
    });

    const parsedData = data?.map((item) => {
        const category = item.category.translations.find((item) => item.languages_code === lang);
        const translation = item.translations.find((item) => item.languages_code === lang);

        return {
            name: category.name,
            image: item.category.category_image,
            list: [
                {
                    ...translation,
                    image: item.image,
                    billingPeriod: item.billing_period,
                },
            ],
        };
    });

    const mergedDataByCategories = parsedData.reduce((previous: typeof parsedData, item) => {
        const category = previous.find((listItem) => listItem.name === item.name);

        if (category) {
            category.list = [...category.list, ...item.list];
        } else {
            previous.push(item);
        }

        return previous;
    }, []);

    return {
        loading,
        data: mergedDataByCategories,
    };
};

export default function PricingPage() {
    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentFaq, setCurrentFaq] = useState(0);
    const { lang, locale } = useLanguage("lang", localization);

    const { data: pricingsData, loading: pricingsLoading } = usePricingsAPI(lang);
    const { loading: faqsLoading, data: faqsData } = useFAQsAPI(lang);

    const PricingBlock = (props: typeof pricingsData[0]["list"][0] & { index: number }) => {
        const color = [
            "rgba(39, 39, 39, 0.2)", //
            theme.colors.lime,
            theme.colors.yellow.light,
            theme.colors.pink,
        ][props.index];

        const Feature = ({ text, check }: { text: string; check?: boolean }) => (
            <a className="flex items-start gap-3">
                {check ? (
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 22 23">
                        <path
                            style={{ fill: color }}
                            d="M11 21.5195C16.5228 21.5195 21 17.0424 21 11.5195C21 5.99668 16.5228 1.51953 11 1.51953C5.47715 1.51953 1 5.99668 1 11.5195C1 17.0424 5.47715 21.5195 11 21.5195Z"
                        />
                        <path
                            className={"fill-black"}
                            d="M7.70711 11.3124C7.31658 10.9219 6.68342 10.9219 6.29289 11.3124C5.90237 11.7029 5.90237 12.3361 6.29289 12.7266L7.70711 11.3124ZM10 15.0195L9.29289 15.7266C9.49156 15.9253 9.76464 16.0312 10.0453 16.0185C10.326 16.0058 10.5884 15.8756 10.7682 15.6597L10 15.0195ZM15.7682 9.65972C16.1218 9.23544 16.0645 8.60487 15.6402 8.25131C15.2159 7.89775 14.5853 7.95507 14.2318 8.37935L15.7682 9.65972ZM20 11.5195C20 16.4901 15.9706 20.5195 11 20.5195V22.5195C17.0751 22.5195 22 17.5947 22 11.5195H20ZM11 20.5195C6.02944 20.5195 2 16.4901 2 11.5195H0C0 17.5947 4.92487 22.5195 11 22.5195V20.5195ZM2 11.5195C2 6.54897 6.02944 2.51953 11 2.51953V0.519531C4.92487 0.519531 0 5.4444 0 11.5195H2ZM11 2.51953C15.9706 2.51953 20 6.54897 20 11.5195H22C22 5.4444 17.0751 0.519531 11 0.519531V2.51953ZM6.29289 12.7266L9.29289 15.7266L10.7071 14.3124L7.70711 11.3124L6.29289 12.7266ZM10.7682 15.6597L15.7682 9.65972L14.2318 8.37935L9.23178 14.3793L10.7682 15.6597Z"
                        />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 flex-shrink-0 fill-pink" viewBox="0 0 22 23">
                        <path d="M13.2929 15.227C13.6834 15.6175 14.3166 15.6175 14.7071 15.227C15.0976 14.8365 15.0976 14.2033 14.7071 13.8128L13.2929 15.227ZM8.70711 7.81279C8.31658 7.42227 7.68342 7.42227 7.29289 7.81279C6.90237 8.20331 6.90237 8.83648 7.29289 9.227L8.70711 7.81279ZM14.7071 9.227C15.0976 8.83648 15.0976 8.20331 14.7071 7.81279C14.3166 7.42227 13.6834 7.42227 13.2929 7.81279L14.7071 9.227ZM7.29289 13.8128C6.90237 14.2033 6.90237 14.8365 7.29289 15.227C7.68342 15.6175 8.31658 15.6175 8.70711 15.227L7.29289 13.8128ZM20 11.5199C20 16.4905 15.9706 20.5199 11 20.5199V22.5199C17.0751 22.5199 22 17.595 22 11.5199H20ZM11 20.5199C6.02944 20.5199 2 16.4905 2 11.5199H0C0 17.595 4.92487 22.5199 11 22.5199V20.5199ZM2 11.5199C2 6.54933 6.02944 2.5199 11 2.5199V0.519897C4.92487 0.519897 0 5.44477 0 11.5199H2ZM11 2.5199C15.9706 2.5199 20 6.54933 20 11.5199H22C22 5.44477 17.0751 0.519897 11 0.519897V2.5199ZM14.7071 13.8128L8.70711 7.81279L7.29289 9.227L13.2929 15.227L14.7071 13.8128ZM13.2929 7.81279L7.29289 13.8128L8.70711 15.227L14.7071 9.227L13.2929 7.81279Z" />
                    </svg>
                )}

                <p>{text}</p>
            </a>
        );

        return (
            <article className="w-full border-8 flex flex-col text-black font-poppins overflow-hidden" style={{ borderColor: color }}>
                <div className="grid gap-8 bg-opacity-20 p-10 h-max" style={{ backgroundColor: color }}>
                    <img src={`/api/cms/assets/${props.image}`} alt="" className="h-14" />

                    <div className="grid gap-2">
                        <h6 className="text-sm">Level {(props.index + 1) * 10}</h6>
                        <h3 className="font-vidaloka text-4xl">{props.title}</h3>
                        <p>{props.short_description}</p>
                    </div>

                    <div className="flex items-end">
                        <h2 className="text-3xl font-semibold">{props.price}</h2>
                        {props.billingPeriod && <span>/{props.billingPeriod}</span>}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        {(props.key_features as string[])?.map((feature, index) => (
                            <Button.Secondary active key={index} className="border-none">
                                {feature}
                            </Button.Secondary>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-10 p-10 h-full">
                    <div className="grid gap-5">
                        <h3 className="font-vidaloka text-xl">{locale.pricing.includedFeatures}</h3>

                        <div className="grid gap-2 fill-navy">
                            {(props.features_included as string[])?.map((feature, index) => (
                                <Feature text={feature} key={index} check />
                            ))}
                        </div>

                        {props.features_not_included && (
                            <>
                                <h3 className="font-vidaloka text-xl">
                                    {locale.pricing.notIncludedFeatures[0]} <u>{locale.pricing.notIncludedFeatures[1]}</u> {locale.pricing.notIncludedFeatures[2]}
                                </h3>

                                <div className="grid gap-2">
                                    {(props.features_not_included as string[])?.map((feature, index) => (
                                        <Feature text={feature} key={index} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <Link href={`/contact?category=${pricingsData[currentCategory].name}&package=${props.title}`} passHref>
                        <Button.Primary className="!w-full">{locale.pricing.button}</Button.Primary>
                    </Link>
                </div>
            </article>
        );
    };

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-yellow-light">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center max-w-2xl">
                        <h1 className="title">{locale.header.title}</h1>
                        <h4 className="subtitle">{locale.header.subtitle}</h4>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 font-poppins font-semibold">
                        {!pricingsLoading &&
                            pricingsData.map((category, index) => (
                                <a
                                    key={index}
                                    onClick={() => setCurrentCategory(index)}
                                    className={
                                        `flex items-center justify-center gap-4 px-10 py-3 cursor-pointer hover:opacity-70 duration-200  ` + //
                                        (index === currentCategory //
                                            ? "bg-black text-white"
                                            : "border-black border-opacity-20 border-2 text-black")
                                    }
                                >
                                    <img src={`/api/cms/assets/${category.image}`} alt="" className="h-16" />
                                    <p>{category.name}</p>
                                </a>
                            ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-28">
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {!pricingsLoading &&
                            pricingsData?.[currentCategory]?.list.map((plan, index) => (
                                <PricingBlock {...plan} key={index} index={index} /> //
                            ))}
                    </div>

                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center text-black bg-lime p-10 md:p-20 lg:py-0 gap-20">
                        <div className="grid gap-10 flex-1 lg:py-20 max-w-xl">
                            <div className="grid gap-5 h-max">
                                <h1 className="jumbo-title">{locale.priorityCTA.title}</h1>
                                <p className="subtitle">{locale.priorityCTA.subtitle}</p>
                            </div>

                            <Button.Primary className="!w-full" onClick={() => alert(locale.priorityCTA.alert)}>
                                {locale.priorityCTA.button}
                            </Button.Primary>
                        </div>

                        <div className="flex-1 h-full overflow-visible flex items-end">
                            <img src="/images/illustrations/priority.png" alt="" className="object-bottom max-h-full origin-bottom transform lg:scale-150 xl:scale-100" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="py-20 relative">
                <div className="container grid gap-16 text-black">
                    <h1 className="title text-center">{locale.faq.title}</h1>

                    <div className="grid gap-5 w-full font-poppins max-w-4xl mx-auto">
                        {!faqsLoading &&
                            faqsData?.[0]?.list.map((faq, index) => (
                                <article key={index} className="grid gap-5 py-5 border-b border-black border-opacity-20 duration-200">
                                    <div className="flex justify-between items-center w-full hover:opacity-70 duration-200 cursor-pointer gap-6" onClick={() => setCurrentFaq(index)}>
                                        <h3 className="subtitle">{faq.question}</h3>
                                        <Icon.ChevronBottom className={`h-2 stroke-current fill-transparent transform origin-center duration-500 ${currentFaq === index && "rotate-180"}`} />
                                    </div>

                                    <p className={`font-poppins ${currentFaq !== index && "hidden"}`}>{faq.answer}</p>
                                </article>
                            ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
