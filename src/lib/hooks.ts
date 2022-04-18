/* eslint-disable react-hooks/exhaustive-deps */
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useState } from "react";

const getComponentName = () => {
    const stack = new Error().stack;
    const lines = stack.split("\n");
    const line = lines[3];
    const match = line.match(/at (.*) \(/);
    const name = match[1];
    return name;
};

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

type useLanguageReturns<T> = {
    lang: string;
    locale: T[keyof T];
    setLang: Dispatch<SetStateAction<string>>;
};

export const useLanguage = <T>(keyName: string, localization: T, defaultKey?: keyof T): useLanguageReturns<T> => {
    const componentName = getComponentName();

    if (!defaultKey) {
        defaultKey = Object.keys(localization)[0] as any;
    }

    const [lang, setLang] = useState<string>(defaultKey as string);
    const [locale, setLocale] = useState<T[keyof T]>(localization[Object.keys(localization)[0]]);

    // Handle on first render
    useEffect(() => {
        let savedLang = localStorage.getItem(keyName);

        if (!savedLang || (savedLang && !localization[savedLang])) {
            savedLang = defaultKey as string;
        }

        setLang(savedLang);
    }, [defaultKey, keyName]);

    // Handle on language change
    useEffect(() => {
        if (lang && localization[lang]) {
            const updateEvent = new CustomEvent("languageChanged", {
                detail: {
                    lang,
                    keyName,
                },
            });

            localStorage.setItem(keyName, lang);
            document.dispatchEvent(updateEvent);
        } else {
            console.error(`Language "${lang}" is not supported, found on "${componentName}" component.`);
        }
    }, [keyName, lang]);

    // Handle on locale change (Based on document event)
    useEffect(() => {
        document.addEventListener("languageChanged", (e: CustomEvent) => {
            if (e.detail.keyName === keyName && localization[e.detail.lang]) {
                setLocale(localization[e.detail.lang]);
            } else {
                console.error(`Language ${e.detail.lang} is not supported, found on ${componentName} component.`);
            }
        });
    }, []);

    return {
        lang,
        setLang,
        locale,
    };
};

export const useDragToScroll = (elementId: string) => {
    useEffect(() => {
        const slider = document.getElementById(elementId);
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        });

        slider.addEventListener("mouseleave", () => {
            isDown = false;
        });

        slider.addEventListener("mouseup", () => {
            isDown = false;
            beginMomentumTracking();
        });

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;

            e.preventDefault();

            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1; //scroll-fast
            const prevScrollLeft = slider.scrollLeft;

            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });

        // Momentum

        let velX = 0;
        let momentumID: number;

        slider.addEventListener("wheel", () => {
            cancelMomentumTracking();
        });

        const beginMomentumTracking = () => {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        };

        const cancelMomentumTracking = () => {
            cancelAnimationFrame(momentumID);
        };

        const momentumLoop = () => {
            slider.scrollLeft += velX;
            velX *= 0.95;

            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        };
    }, [elementId]);
};
