import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

        const performTypewrite = async (bound: Bound) => {
            if (bound.isActive) return;

            bound.finished = false;
            bound.isActive = true;
            bound.element.textContent = "";

            for (const text of bound.text) {
                bound.element.textContent += text;
                await new Promise((resolve) => setTimeout(resolve, 100));
            }

            bound.finished = true;
        };

        document.addEventListener("scroll", async () => {
            if (Date.now() - lastScrollEventTime < 500) return;
            lastScrollEventTime = Date.now();

            for (const { element, id, finished } of bounds) {
                const distanceFromTop = window.scrollY + element.getBoundingClientRect().top + window.innerHeight / 6;
                const rawPercentScrolled = (window.scrollY - distanceFromTop) / (element.scrollHeight - window.innerHeight);
                const percentScrolled = 1 - Math.min(Math.max(rawPercentScrolled, 0), 1);

                if (percentScrolled > 0) {
                    await performTypewrite(bounds[id]);
                } else if (finished) {
                    element.textContent = "|";
                    bounds[id].isActive = false;
                }
            }
        });

        for (const element of foundElements) {
            const id = bounds.push({
                id: bounds.length,
                element,
                text: element.textContent,
                isActive: false,
                finished: false,
                height: element.clientHeight,
            });

            performTypewrite(bounds[id - 1]);
        }
    }, [selector]);
};

export const useLanguage = (keyName = "lang", defaultKey?: string): [string, Dispatch<SetStateAction<string>>] => {
    const [lang, setLang] = useState(null);

    useEffect(() => {
        let lang = localStorage.getItem(keyName);

        if (!lang && defaultKey) {
            lang = defaultKey;
        }

        setLang(lang);
    }, [defaultKey, keyName]);

    useEffect(() => {
        if (lang) {
            localStorage.setItem(keyName, lang);
        }
    }, [keyName, lang]);

    return [lang, setLang];
};
