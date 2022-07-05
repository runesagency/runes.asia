/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import { useEffect, useState, useRef } from "react";

type RecursiveObject<T> = {
    [key: string]: T | RecursiveObject<T>;
};

const getComponentName = () => {
    const stack = new Error().stack;
    const lines = stack.split("\n");
    const line = lines[3];
    const match = line.match(/at (.*) \(/);
    const name = match[1];
    return name;
};

const getNestedKeyRecursively = (object: RecursiveObject<any>, lastKey = []) => {
    let result = [];

    for (const key of Object.keys(object)) {
        if (typeof object[key] !== "object") {
            result.push([...lastKey, key].join("."));
        }

        const nested = getNestedKeyRecursively(object[key], [...lastKey, key]);
        result = result.concat(nested);
    }

    return result;
};

type useLanguageReturns<T> = {
    lang: string;
    locale: T[keyof T];
    setLang: Dispatch<SetStateAction<string>>;
};

export const useLanguage = <T>(keyName: string, localization: T, defaultLang?: keyof T): useLanguageReturns<T> => {
    const componentName = getComponentName();

    if (!defaultLang) {
        defaultLang = Object.keys(localization)[0] as any;
    }

    const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const firstEventFired = useRef(false);
    const [lang, setLang] = useState<string>(defaultLang as string);
    const [locale, setLocale] = useState<T[keyof T]>(localization[Object.keys(localization)[0]]);

    // Handle on first render
    useEffect(() => {
        let savedLang = localStorage.getItem(keyName);

        if (!savedLang || !localization[savedLang]) {
            let browserLang = navigator?.language?.split("-")[0] || null;

            if (browserLang && localization[browserLang]) {
                savedLang = browserLang;
            } else {
                savedLang = defaultLang as string;
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
    }, [defaultLang, keyName]);

    // Handle on language change
    useEffect(() => {
        // Do not fired "default language" event on first render
        if (!firstEventFired.current && lang === defaultLang) return;
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

type useAPIOptions = {
    // eslint-disable-next-line no-unused-vars
    errorCallback?: (error: Error) => void;
    defaultValue?: any;
    fields?: RecursiveObject<true>;
    filter?: RecursiveObject<any>;
    headers?: [string, string][] | { [key: string]: string };
    search?: string;
    sort?: string[];
    deps?: any[];
} & (
    | {
          limit: number;
          page: number;
      }
    | {
          skip: number; // offset
          limit?: number;
      }
);

export const useCMSAPI = <T>(path: `/${string}`, options: useAPIOptions) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>(options?.defaultValue || null);
    const router = useRouter();

    const headers = options.headers || {};

    useEffect(() => {
        if (options.deps && options.deps.every((dep) => !dep)) return;

        const protocol = window.location.protocol;
        const domain = window.location.hostname;
        const port = window.location.port;

        const parsedUrl = new URL(`${protocol}//${domain}:${port ? port : ""}/api/cms${path}`);

        if (options.fields) {
            let fields = getNestedKeyRecursively(options.fields).join(",");
            parsedUrl.searchParams.set("fields", fields);
        }

        if (options.filter) {
            parsedUrl.searchParams.set("filter", JSON.stringify(options.filter));
        }

        if (options.sort) {
            parsedUrl.searchParams.set("sort", options.sort.join(","));
        }

        (options as any).offset = (options as any).skip;
        for (let key of ["search", "offset", "page", "limit"]) {
            if (options[key]) {
                parsedUrl.searchParams.set(key, String(options[key]));
            }
        }

        fetch(parsedUrl.href, {
            method: "GET",
            headers,
        })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                setData(response.data);
            })
            .catch((error) => {
                if (process.env.NODE_ENV === "development") {
                    console.error(error);
                }

                if (options.errorCallback) {
                    options.errorCallback(error);
                } else {
                    alert("Something went wrong, please contact web admin and try again later.");
                    router.push("/");
                }

                setLoading(false);
            });

        return () => {
            setLoading(true);
            setData(options?.defaultValue || null);
        };
    }, options.deps || []);

    return {
        data,
        loading,
    };
};
