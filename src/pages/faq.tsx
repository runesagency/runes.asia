import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/faq";

import { theme } from "tailwind.config";

type QnAData = {
    title: string;
    list: {
        question: string;
        answer: string;
    }[];
}[];

const QnA = ({ data }: { data: QnAData }) => {
    const nowCategoryId = useRef(0);
    const categoriesSection = useRef<HTMLDivElement>(null);
    const faqsSection = useRef<HTMLDivElement>(null);

    const categoryId = (id: number) => `nav-category-${id}`;
    const boxCategoryId = (id: number) => `category-${id}`;
    const qnaBoxId = (id: number) => `qna-box-${id}`;

    useEffect(() => {
        document.addEventListener("scroll", () => {
            // Side Menu Sticky Effect When Scrolling
            (() => {
                const categories = categoriesSection.current;
                const faqs = faqsSection.current;

                if (categories) {
                    const scrollTop = categories.getBoundingClientRect().top * -1;

                    if (scrollTop >= 0) {
                        if (scrollTop >= faqs.clientHeight - 100) return;
                        categories.style.paddingTop = scrollTop + 20 + "px";
                    } else {
                        categories.style.paddingTop = "0px";
                    }
                }
            })();

            // Active Category Effect When Scrolling
            (() => {
                for (let i = 0; i <= data.length - 1; i++) {
                    const category = document.getElementById(categoryId(i));
                    const boxCategory = document.getElementById(boxCategoryId(i));
                    const qnaBox = document.getElementById(qnaBoxId(i));

                    if (category && boxCategory && qnaBox) {
                        const scrollTop = boxCategory.getBoundingClientRect().top * -1 + 200;
                        const color = boxCategory.dataset.backgroundcolor;
                        const id = boxCategory.dataset.categoryid;

                        if (scrollTop >= 0 && scrollTop <= boxCategory.clientHeight) {
                            if (category) category.style.backgroundColor = color;
                            qnaBox.style.backgroundColor = color;
                            nowCategoryId.current = Number(id);
                        } else {
                            if (category) category.style.backgroundColor = "transparent";
                            qnaBox.style.backgroundColor = "transparent";
                        }
                    }
                }
            })();
        });

        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowUp") {
                nowCategoryId.current -= 1;

                if (nowCategoryId.current < 0) {
                    nowCategoryId.current = 0;
                }
            } else if (e.key === "ArrowDown") {
                nowCategoryId.current += 1;

                if (nowCategoryId.current > data.length - 1) {
                    nowCategoryId.current = data.length - 1;
                }
            }

            const parent = faqsSection.current;
            const element = document.getElementById(boxCategoryId(nowCategoryId.current));

            console.log(parent.scrollTop, element.offsetTop);

            // window.scrollTo(0, element.offsetTop + parent.scrollTop);
        });

        return () => {
            document.removeEventListener("scroll", () => {});
            document.removeEventListener("keyup", () => {});
        };
    }, [data]);

    return (
        <section className="sticky py-20 overflow-auto">
            <div className="container flex gap-20 overflow-auto">
                <div ref={categoriesSection} className="hidden lg:grid gap-2 subtitle font-medium h-max self-start sticky top-0">
                    {data.map((item, index) => (
                        <a
                            key={index}
                            id={categoryId(index)}
                            href={`#${boxCategoryId(index)}`}
                            className="px-5 py-3 border-b border-black border-opacity-30 transition-all duration-300 hover:opacity-70"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>

                <div ref={faqsSection} className="grid gap-14 flex-1 font-poppins">
                    {data.map((item, index) => {
                        const colors = [theme.colors.lime, theme.colors.pink, theme.colors.yellow.light];
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];

                        return (
                            <div key={index} id={boxCategoryId(index)} className="grid gap-5" data-backgroundcolor={randomColor} data-categoryid={index}>
                                <h4 className="subtitle uppercase">{item.title}</h4>

                                <div id={qnaBoxId(index)} className="grid gap-4 p-6 transition-all duration-300">
                                    {item.list.map((item, index) => (
                                        <div key={index} className="grid gap-4">
                                            <h6 className="subtitle font-bold">{item.question}</h6>
                                            <p>{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default function FAQPage() {
    const { locale } = useLanguage("lang", localization);

    const dummy = [
        {
            title: "Common Questions",
            list: [
                {
                    question: "Are there any hidden fees?",
                    answer: "No, we don't charge any fees for using our services. We only charge for the services you use.",
                },
                {
                    question: "Can I use your services for free?",
                    answer: "Yes, you can use our services for free. However, we do charge for the services you use.",
                },
                {
                    question: "Is there any design task that is not supported?",
                    answer: "Yes, we do support all kinds of design tasks. However, we do not support any design task that is not supported.",
                },
            ],
        },
        {
            title: "How We Work",
            list: [
                {
                    question: "How do you work?",
                    answer: "We work with you to create a design that is unique and beautiful. We will work with you to create a design that is unique and beautiful.",
                },
                {
                    question: "What does 1 Brand/Product mean?",
                    answer: "1 Brand/Product means that you will be working with 1 brand/product. We will work with you to create a design that is unique and beautiful.",
                },
                {
                    question: "What does 1 Design Task mean?",
                    answer: "1 Design Task means that you will be working with 1 design task. We will work with you to create a design that is unique and beautiful.",
                },
            ],
        },
    ];

    return (
        <main className="relative bg-white overflow-auto">
            {/* Header */}
            <section id="header" className="relative py-20">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center">
                        <h1 className="title">{locale.header.title}</h1>
                        <h4 className="subtitle">{locale.header.subtitle}</h4>
                    </div>
                </div>
            </section>

            <QnA data={dummy} />

            <Footer />
        </main>
    );
}
