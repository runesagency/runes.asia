/* eslint-disable react-hooks/exhaustive-deps */
import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import { useEffect, useState, useRef } from "react";

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
                if (element.getAttribute(selector) === "true") {
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

    const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const firstEventFired = useRef(false);
    const [lang, setLang] = useState<string>(defaultKey as string);
    const [locale, setLocale] = useState<T[keyof T]>(localization[Object.keys(localization)[0]]);

    // Handle on first render
    useEffect(() => {
        let savedLang = localStorage.getItem(keyName);

        if (!savedLang || !localization[savedLang]) {
            let browserLang = navigator?.language?.split("-")[0] || null;

            if (browserLang && localization[browserLang]) {
                savedLang = browserLang;
            } else {
                savedLang = defaultKey as string;
            }
        }

        setLang(savedLang);

        document.addEventListener("languageChanged", (e: CustomEvent) => {
            if (
                e.detail.keyName === keyName && // Prevent execution for another key name
                e.detail.uniqueId !== uniqueId // Prevent loop
            ) {
                setLang(e.detail.lang);
            }
        });
    }, [defaultKey, keyName]);

    // Handle on language change
    useEffect(() => {
        // Do not fired "default language" event on first render
        if (!firstEventFired.current && lang === defaultKey) return;
        firstEventFired.current = true;

        if (lang && localization[lang]) {
            const updateEvent = new CustomEvent("languageChanged", {
                detail: {
                    lang,
                    keyName,
                    uniqueId,
                },
            });

            localStorage.setItem(keyName, lang);
            setLocale(localization[lang]);

            document.dispatchEvent(updateEvent);
        } else {
            console.error(`Language "${lang}" is not supported, found on "${componentName}" component.`);
        }
    }, [keyName, lang]);

    return {
        lang,
        setLang,
        locale,
    };
};

export const useDragToScroll = (element: MutableRefObject<HTMLDivElement>) => {
    useEffect(() => {
        const slider = element.current;
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
            const walk = (x - startX) * 1.2; //scroll-fast
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
            velX *= 0.98;

            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        };

        return () => {
            slider.removeEventListener("mousedown", () => {});
            slider.removeEventListener("mouseleave", () => {});
            slider.removeEventListener("mouseup", () => {});
            slider.removeEventListener("mousemove", () => {});
            slider.removeEventListener("wheel", () => {});
        };
    }, [element]);
};
