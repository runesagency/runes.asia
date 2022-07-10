import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import * as Button from "@/components/Forms/Buttons";
import * as Icon from "@/components/Utils/Icons";

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
                billing_period: true,
                theme_color: true,
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
                    themeColor: item.theme_color,
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

    const PricingBlock = (props: typeof pricingsData[0]["list"][0]) => {
        const Feature = ({ text, check }: { text: string; check?: boolean }) => (
            <a className="flex items-start gap-3">
                {check ? (
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 22 23">
                        <path
                            style={{ fill: props.themeColor }}
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
            <article className="w-full border-8 flex flex-col text-black font-poppins overflow-hidden" style={{ borderColor: props.themeColor }}>
                <div className="grid gap-8 bg-opacity-20 p-10 h-max" style={{ backgroundColor: props.themeColor }}>
                    <svg width="50" height="56" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.204 2.127C12.841 3.297 9.803 5.701 8.454 7.471C7.104 9.24 6 11.429 6 12.336C6 13.242 4.65 15.186 3 16.657C1.35 18.127 0 19.94 0 20.686C0 21.432 1.116 22.551 2.481 23.172C4.286 23.995 4.83 24.874 4.479 26.401C4.213 27.555 3.102 34.092 2.01 40.928C0.918 47.763 0.208 53.541 0.433 53.766C0.659 53.991 3.762 51.938 7.33 49.203C10.898 46.468 16.274 43.068 19.277 41.648C22.28 40.227 26.529 38.778 28.719 38.428L32.7 37.791L33.346 43.289C33.702 46.313 33.724 50.13 33.396 51.771C33.039 53.552 33.26 55.042 33.942 55.463C34.591 55.864 37.499 54.107 40.671 51.397C43.743 48.772 47.097 45.247 48.125 43.562C49.152 41.877 49.994 39.451 49.996 38.17C49.998 36.888 48.825 32.903 47.388 29.312C45.081 23.546 44.933 22.493 46.115 20.284C47.308 18.055 47.23 17.604 45.391 16.114C44.257 15.196 43.03 13.254 42.665 11.799C42.299 10.344 40.784 7.707 39.297 5.94C37.81 4.173 35.124 2.113 33.329 1.363C31.533 0.613001 27.687 -0.00099878 24.782 1.21977e-06C21.41 1.21977e-06 17.946 0.770001 15.204 2.127ZM31.186 3.034C33.213 3.597 36.025 5.429 37.436 7.105C38.846 8.781 40 11.266 40 12.627C40 14.539 39.152 15.456 36.268 16.661C34.215 17.518 29.152 18.421 25.018 18.666C20.488 18.935 15.513 18.584 12.5 17.783C8.234 16.649 7.536 16.123 7.742 14.203C7.876 12.965 8.757 10.773 9.701 9.333C10.645 7.892 13.686 5.657 16.458 4.366C19.231 3.075 22.85 2.017 24.5 2.014C26.15 2.012 29.159 2.471 31.186 3.034ZM45 18.585C45 18.869 43.434 19.756 41.519 20.556C39.604 21.355 33.788 22.451 28.593 22.989C22.409 23.631 16.464 23.628 11.373 22.983C7.097 22.441 3.126 21.517 2.549 20.931C1.814 20.184 2.034 19.47 3.283 18.547C4.783 17.44 6.058 17.544 11.283 19.204C16.051 20.718 19.271 21.065 25.096 20.694C29.494 20.413 34.545 19.383 37.096 18.247C40.087 16.915 42.062 16.572 43.25 17.177C44.212 17.668 45 18.301 45 18.585ZM45.003 28.227C46.239 31.102 47.478 35.141 47.754 37.204C48.227 40.727 47.86 41.361 41.658 47.726L35.059 54.499L35.628 49.499C35.941 46.749 35.707 41.124 35.108 36.999C34.509 32.874 33.743 28.511 33.407 27.304C32.894 25.464 33.337 24.953 36.148 24.144C37.991 23.614 40.232 23.139 41.127 23.089C42.173 23.031 43.556 24.864 45.003 28.227ZM8.597 32.999C7.539 37.23 7.197 37.807 7.116 35.499C7.058 33.849 7.538 30.699 8.183 28.499C8.827 26.299 9.494 25.174 9.664 25.999C9.834 26.824 9.354 29.974 8.597 32.999ZM14.154 30.074C13.942 33.255 13.137 35.202 11.292 36.999C9.653 38.596 8.927 38.913 9.282 37.877C9.589 36.985 10.158 34.06 10.547 31.377C10.936 28.694 11.464 26.138 11.719 25.696C11.974 25.255 12.693 25.063 13.317 25.271C13.996 25.498 14.332 27.42 14.154 30.074Z"
                            fill="#272727"
                        />
                    </svg>

                    <div className="grid gap-2">
                        <h6 className="text-sm">Level {10}</h6>
                        <h3 className="font-vidaloka text-4xl">{props.title}</h3>
                        <p>{props.short_description}</p>
                    </div>

                    <div className="flex items-end">
                        <h2 className="text-3xl font-semibold">{props.price}</h2>
                        {props.billingPeriod && <span>/{props.billingPeriod}</span>}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        {props.key_features.map((feature, index) => (
                            <Button.Secondary active key={index} className="border-none">
                                {feature}
                            </Button.Secondary>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-10 p-10 h-full">
                    <div className="grid gap-5">
                        <h3 className="font-vidaloka text-xl">What You Get</h3>

                        <div className="grid gap-2 fill-navy">
                            {props.features_included.map((feature, index) => (
                                <Feature text={feature} key={index} check />
                            ))}
                        </div>

                        <h3 className="font-vidaloka text-xl">
                            What You <u>Don't</u> Get
                        </h3>

                        <div className="grid gap-2">
                            {props.features_not_included.map((feature, index) => (
                                <Feature text={feature} key={index} />
                            ))}
                        </div>
                    </div>

                    <Button.Primary className="!w-full">Let's Get Started</Button.Primary>
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
                        {pricingsData.map((category, index) => (
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
                                <PricingBlock {...plan} key={index} /> //
                            ))}
                    </div>

                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center text-black bg-lime p-10 md:p-20 lg:py-0 gap-20">
                        <div className="grid gap-10 flex-1 lg:py-20 max-w-xl">
                            <div className="grid gap-5 h-max">
                                <h1 className="jumbo-title">{locale.priorityCTA.title}</h1>
                                <p className="subtitle">{locale.priorityCTA.subtitle}</p>
                            </div>

                            <Button.Primary className="!w-full">{locale.priorityCTA.button}</Button.Primary>
                        </div>

                        <div className="flex-1 h-full overflow-visible">
                            <img src="/images/illustrations/priority.png" alt="" className="object-bottom max-h-full origin-bottom transform lg:scale-150 xl:scale-100" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="py-20 relative">
                <div className="container grid gap-16 text-black">
                    <h1 className="title mx-auto">{locale.faq.title}</h1>

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
