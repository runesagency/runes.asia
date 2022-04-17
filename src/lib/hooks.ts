import { useEffect, useState } from "react";
import * as localization from "@/lib/localization";

export const useTypewriter = (selector = "data-typewriter") => {
    useEffect(() => {
        type Bound = {
            id: number;
            element: Element;
            text: string;
            isActive: boolean;
            finished: boolean;
            height: number;
        };

        let bounds: Bound[] = [];
        let lastScrollEventTime = Date.now();
        const foundElements = document.querySelectorAll(`[${selector}]`);

        const performTypewrite = async (id: number) => {
            let bound = bounds[id];
            if (bound.isActive) return;

            bound.finished = false;
            bound.isActive = true;
            bound.element.textContent = "";

            for (const text of bound.text) {
                bound = bounds[id];
                if (!bound?.isActive) return;

                bound.element.textContent += text;
                await new Promise((resolve) => setTimeout(resolve, 100));
            }

            bound.finished = true;
        };

        const initTypewrite = () => {
            for (const element of foundElements) {
                const id = bounds.push({
                    id: bounds.length,
                    element,
                    text: element.textContent,
                    isActive: false,
                    finished: false,
                    height: element.clientHeight,
                });

                performTypewrite(id - 1);
            }
        };

        document.addEventListener("scroll", async () => {
            if (Date.now() - lastScrollEventTime < 500) return;
            lastScrollEventTime = Date.now();

            for (const { element, id, finished } of bounds) {
                const distanceFromTop = window.scrollY + element.getBoundingClientRect().top + window.innerHeight / 6;
                const rawPercentScrolled = (window.scrollY - distanceFromTop) / (element.scrollHeight - window.innerHeight);
                const percentScrolled = 1 - Math.min(Math.max(rawPercentScrolled, 0), 1);

                if (percentScrolled > 0) {
                    await performTypewrite(id);
                } else if (finished) {
                    element.textContent = "|";
                    bounds[id].isActive = false;
                }
            }
        });

        let changesTimeout: any = 0;

        document.addEventListener(
            "languageChanged",
            () => {
                console.log(1);
                bounds = [];

                if (changesTimeout) {
                    clearTimeout(changesTimeout);
                }

                changesTimeout = setTimeout(initTypewrite, 1000);
            },
            false
        );

        setTimeout(() => {
            if (!changesTimeout) {
                changesTimeout = setTimeout(initTypewrite, 1000);
            }
        });
    }, [selector]);
};

export const useLanguage = (keyName = "lang", defaultKey?: keyof typeof localization) => {
    if (!defaultKey) {
        defaultKey = Object.keys(localization)[0] as keyof typeof localization;
    }

    const [lang, setLang] = useState<string>(defaultKey);
    const [locale, setLocale] = useState<typeof localization[keyof typeof localization]>(localization[Object.keys(localization)[0]]);

    // Handle on first render
    useEffect(() => {
        let savedLang = localStorage.getItem(keyName);

        if (!savedLang || (savedLang && !localization[savedLang])) {
            savedLang = defaultKey;
        }

        setLang(savedLang);
    }, [defaultKey, keyName]);

    // Handle on language change
    useEffect(() => {
        if (lang && localization[lang]) {
            const updateEvent = new CustomEvent("languageChanged", {
                detail: {
                    lang,
                },
            });

            localStorage.setItem(keyName, lang);
            document.dispatchEvent(updateEvent);
        } else {
            console.error(`Language ${lang} is not supported.`);
        }
    }, [keyName, lang]);

    // Handle on locale change (Based on document event)
    useEffect(() => {
        document.addEventListener("languageChanged", (e: CustomEvent) => {
            setLocale(localization[e.detail.lang]);
        });
    });

    return {
        lang,
        setLang,
        locale,
    };
};
