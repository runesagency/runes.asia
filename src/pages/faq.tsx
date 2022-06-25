import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";

import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/faq";
import { useEffect } from "react";

export default function ShowcasesPage() {
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

    useEffect(() => {
        document.addEventListener("scroll", () => {
            (() => {
                for (let i = 0; i <= dummy.length - 1; i++) {
                    const title = document.getElementById("title-" + i);
                    const box = document.getElementById("box-" + i);
                    const ans = document.getElementById("ans-" + i);
                    const scrollTop = box.getBoundingClientRect().top * -1 + 200;

                    if (scrollTop >= 0 && scrollTop <= box.clientHeight) {
                        title.classList.add("bg-pink");
                        ans.classList.add("bg-pink");
                    } else {
                        title.classList.remove("bg-pink");
                        ans.classList.remove("bg-pink");
                    }
                }
            })();

            (() => {
                const categories = document.getElementById("categories");
                const faqs = document.getElementById("faqs");
                // Count how much pixel the user has scrolled after the scroll reach the top of categories element
                const scrollTop = categories.getBoundingClientRect().top * -1;

                if (scrollTop >= 0) {
                    if (scrollTop >= faqs.clientHeight - 100) return;
                    categories.style.paddingTop = scrollTop + 20 + "px";
                } else {
                    categories.style.paddingTop = "0px";
                }
            })();
        });
    });

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

            {/* Content */}
            <section className="sticky py-20 overflow-auto">
                <div className="container flex gap-20 overflow-auto">
                    <div id="categories" className="grid gap-2 subtitle font-medium h-max self-start sticky top-0">
                        {dummy.map((item, index) => (
                            <h3 key={index} id={"title-" + index} className="px-5 py-3 border-b border-black border-opacity-30">
                                {item.title}
                            </h3>
                        ))}
                    </div>

                    <div id="faqs" className="grid gap-14 flex-1 font-poppins">
                        {dummy.map((item, index) => (
                            <div key={index} id={"box-" + index} className="grid gap-5">
                                <h4 className="subtitle uppercase">{item.title}</h4>

                                <div id={"ans-" + index} className="grid gap-4 p-6">
                                    {item.list.map((item, index) => (
                                        <div key={index} className="grid gap-4">
                                            <h6 className="subtitle font-bold">{item.question}</h6>
                                            <p>{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
