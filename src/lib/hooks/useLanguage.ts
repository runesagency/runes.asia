/* eslint-disable react-hooks/exhaustive-deps */
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useState, useRef } from "react";
import { getTopComponentName } from "@/lib/functions";

type useLanguageReturns<T> = {
    lang: string;
    locale: T[keyof T];
    setLang: Dispatch<SetStateAction<string>>;
};

export const useLanguage = <T>(keyName: string, localization: T, defaultLang?: keyof T): useLanguageReturns<T> => {
    const componentName = getTopComponentName();

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
