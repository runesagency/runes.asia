import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";

import { theme } from "tailwind.config";
import { useEffect, useRef, useState } from "react";
import { useCMSAPI, useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/faq";

export const getStaticProps = async () => {
    return {
        props: {
            themeColor: theme.colors.white,
        },
    };
};

export const useFAQsAPI = (lang: string) => {
    const { data, loading } = useCMSAPI("/items/faqs", {
        defaultValue: [],
        skip: 0,
        fields: [
            {
                faq_category_id: {
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
                        question: true,
                        answer: true,
                    },
                ],
            },
        ],
    });

    const parsedData = data.map((item) => {
        const category = item.faq_category_id.translations.find((item) => item.languages_code === lang);
        const question = item.translations.find((item) => item.languages_code === lang);

        return {
            title: category.name,
            list: [
                {
                    question: question.question,
                    answer: question.answer,
                },
            ],
        };
    });

    const mergedDataByCategories = parsedData.reduce((previous: typeof parsedData, item) => {
        const category = previous.find((listItem) => listItem.title === item.title);

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

export default function FAQPage() {
    const faqsRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setScrolling] = useState<number | false>(false);

    const { locale, lang } = useLanguage("lang", localization);
    const { loading, data } = useFAQsAPI(lang);

    const qnaCategoryButtonId = (id: number) => `nav-category-${id}`; // Left navigation button id
    const qnaOuterContainerId = (id: number) => `category-${id}`; // Outer container id (above the title)
    const qnaContentBoxId = (id: number) => `qna-box-${id}`; // Content box id (below the title)

    useEffect(() => {
        let currentCategoryId = -1;

        const scrollHandler = () => {
            for (let i = 0; i <= data.length - 1; i++) {
                const category = document.getElementById(qnaCategoryButtonId(i));
                const boxCategory = document.getElementById(qnaOuterContainerId(i));
                const qnaBox = document.getElementById(qnaContentBoxId(i));

                if (category && boxCategory && qnaBox) {
                    const scrollTop = boxCategory.getBoundingClientRect().top * -1 + 200;
                    const color = boxCategory.dataset.backgroundcolor;
                    const id = boxCategory.dataset.categoryid;

                    if (scrollTop >= 0 && scrollTop <= boxCategory.clientHeight) {
                        if (category) {
                            category.style.backgroundColor = color;
                        }

                        qnaBox.style.backgroundColor = color;

                        if (currentCategoryId !== Number(id)) {
                            currentCategoryId = Number(id);

                            if (isScrolling === false) {
                                location.hash = qnaOuterContainerId(Number(id));
                            } else if (isScrolling === Number(id)) {
                                setScrolling(false);
                            }
                        }
                    } else {
                        if (category) {
                            category.style.backgroundColor = "transparent";
                        }

                        qnaBox.style.backgroundColor = "transparent";
                    }
                }
            }
        };

        const keyUpHandler = (e: KeyboardEvent) => {
            let id = currentCategoryId;

            if (e.key === "ArrowUp") {
                id -= 1;

                if (id < 0) {
                    id = 0;
                }
            } else if (e.key === "ArrowDown") {
                id += 1;

                if (id > data.length - 1) {
                    id = data.length - 1;
                }
            }

            const element = document.getElementById(qnaOuterContainerId(id));

            const countOffsetTop = (element: any) => {
                // recursive until no parent found
                return element?.offsetParent && element.offsetTop + countOffsetTop(element.offsetParent) - 10;
            };

            window.scroll(0, countOffsetTop(element));
            location.hash = qnaOuterContainerId(id);
        };

        document.addEventListener("scroll", scrollHandler);
        document.addEventListener("keyup", keyUpHandler);

        return () => {
            document.removeEventListener("scroll", scrollHandler);
            document.removeEventListener("keyup", keyUpHandler);
        };
    }, [data, isScrolling]);

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section id="header" className="relative py-20">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center">
                        <h1 className="title">{locale.header.title}</h1>
                        <h2 className="subtitle">{locale.header.subtitle}</h2>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container flex gap-20">
                    <aside className="min-h-full">
                        <div className="hidden lg:grid gap-2 subtitle font-medium sticky top-8">
                            {!loading
                                ? data.map((item, index) => (
                                      <a
                                          key={index}
                                          id={qnaCategoryButtonId(index)}
                                          href={`#${qnaOuterContainerId(index)}`}
                                          onClick={() => setScrolling(index)}
                                          className="px-5 py-3 border-b border-gray transition-all duration-300 hover:opacity-70 animate-open"
                                          style={{ animationDelay: `${index * 0.1}s` }}
                                      >
                                          {item.title}
                                      </a>
                                  ))
                                : Array(3)
                                      .fill(0)
                                      .map((_, index) => (
                                          <div className="h-8 w-44 bg-gray animate-pulse rounded-md" key={index} /> //
                                      ))}
                        </div>
                    </aside>

                    <div ref={faqsRef} className="grid gap-14 flex-1 font-poppins overflow-hidden">
                        {!loading
                            ? data.map((item, index) => {
                                  const colors = [theme.colors.green, theme.colors.pink, theme.colors.yellow.light];
                                  const randomColor = colors[Math.floor(Math.random() * colors.length)];

                                  return (
                                      <div
                                          key={index}
                                          id={qnaOuterContainerId(index)}
                                          className="grid gap-5 h-max animate-open"
                                          data-backgroundcolor={randomColor}
                                          data-categoryid={index}
                                          style={{ animationDelay: `${index * 0.1}s` }}
                                      >
                                          <h2 className="subtitle uppercase">{item.title}</h2>

                                          <div id={qnaContentBoxId(index)} className="grid gap-4 p-6 transition-all duration-300">
                                              {item.list.map((item, index) => (
                                                  <div key={index} className="grid gap-4 h-max animate-open" style={{ animationDelay: `${index * 0.1}s` }}>
                                                      <h3 className="subtitle font-bold">{item.question}</h3>
                                                      <p className="leading-relaxed">{item.answer}</p>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  );
                              })
                            : Array(3)
                                  .fill(0)
                                  .map((_, index) => (
                                      <div className="w-full h-96 bg-gray animate-pulse" key={index} /> //
                                  ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
