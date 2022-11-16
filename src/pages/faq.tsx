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
    const categoriesSection = useRef<HTMLDivElement>(null);
    const faqsSection = useRef<HTMLDivElement>(null);
    const [isScrolling, setScrolling] = useState<number | false>(false);

    const { locale, lang } = useLanguage("lang", localization);
    const { loading, data } = useFAQsAPI(lang);

    const categoryId = (id: number) => `nav-category-${id}`;
    const boxCategoryId = (id: number) => `category-${id}`;
    const qnaBoxId = (id: number) => `qna-box-${id}`;

    useEffect(() => {
        let maxCategoryScrollHeight = 0;
        let nowCategoryId = -1;
        let resizeObserver: ResizeObserver | null = null;

        const scrollHandler = () => {
            // Side Menu Sticky Effect When Scrolling
            (() => {
                const categories = categoriesSection.current;
                const faqs = faqsSection.current;

                if (categories) {
                    const scrollTop = categories.getBoundingClientRect().top * -1;
                    if (scrollTop >= maxCategoryScrollHeight) return;

                    if (scrollTop >= 0) {
                        if (scrollTop >= faqs.clientHeight - 200) return;
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
                            if (category) {
                                category.style.backgroundColor = color;
                            }

                            qnaBox.style.backgroundColor = color;

                            if (nowCategoryId !== Number(id)) {
                                nowCategoryId = Number(id);

                                if (isScrolling === false) {
                                    location.hash = boxCategoryId(Number(id));
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
            })();
        };

        const keyUpHandler = (e: KeyboardEvent) => {
            let id = nowCategoryId;

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

            const element = document.getElementById(boxCategoryId(id));

            const countOffsetTop = (element: any) => {
                // recursive until no parent found
                return element?.offsetParent && element.offsetTop + countOffsetTop(element.offsetParent) - 10;
            };

            window.scroll(0, countOffsetTop(element));
            location.hash = boxCategoryId(id);
        };

        document.addEventListener("scroll", scrollHandler);
        document.addEventListener("keyup", keyUpHandler);

        if (faqsSection.current) {
            resizeObserver = new ResizeObserver((entries) => {
                const currentHeight = entries[0].target.clientHeight - 100;

                if (
                    !maxCategoryScrollHeight || //
                    currentHeight - maxCategoryScrollHeight >= 500 ||
                    maxCategoryScrollHeight - currentHeight >= 350
                ) {
                    maxCategoryScrollHeight = currentHeight;
                }
            });

            resizeObserver.observe(faqsSection.current);
        }

        return () => {
            document.removeEventListener("scroll", scrollHandler);
            document.removeEventListener("keyup", keyUpHandler);
            resizeObserver?.disconnect();
        };
    }, [data, isScrolling]);

    return (
        <main className="relative bg-white overflow-auto">
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

            <section className="py-20 overflow-auto">
                <div className="container flex gap-20 overflow-auto">
                    <div ref={categoriesSection} className="hidden lg:grid gap-2 subtitle font-medium h-max self-start sticky top-0">
                        {!loading
                            ? data.map((item, index) => (
                                  <a
                                      key={index}
                                      id={categoryId(index)}
                                      href={`#${boxCategoryId(index)}`}
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

                    <div ref={faqsSection} className="grid gap-14 flex-1 font-poppins overflow-hidden">
                        {!loading
                            ? data.map((item, index) => {
                                  const colors = [theme.colors.green, theme.colors.pink, theme.colors.yellow.light];
                                  const randomColor = colors[Math.floor(Math.random() * colors.length)];

                                  return (
                                      <div
                                          key={index}
                                          id={boxCategoryId(index)}
                                          className="grid gap-5 h-max animate-open"
                                          data-backgroundcolor={randomColor}
                                          data-categoryid={index}
                                          style={{ animationDelay: `${index * 0.1}s` }}
                                      >
                                          <h2 className="subtitle uppercase">{item.title}</h2>

                                          <div id={qnaBoxId(index)} className="grid gap-4 p-6 transition-all duration-300">
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
