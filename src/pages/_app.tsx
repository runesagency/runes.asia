import type { AppProps } from "next/app";

import "../styles/globals.css";

import Script from "next/script";
import ProgressBar from "nextjs-progressbar";
import MetaTags from "@/components/Utils/MetaTags";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { ucWords } from "@/lib/functions";
import { useLanguage } from "@/lib/hooks";
import { languages } from "@/components/Utils/LangChooser";

const App = ({ Component, pageProps }: AppProps) => {
    const { lang } = useLanguage("lang", languages);
    const router = useRouter();

    let title = "";

    if (router.pathname === "/") {
        title = "Runes - Creative Studio & Agency From Indonesia";
    } else {
        const pageName = ucWords(router.pathname.split("/")[1].replace("/", "").replace(/-/g, " "));

        if (pageProps.seo?.subtitle) {
            title = `${pageProps.seo.subtitle} - Runes ${pageName}`;
        } else {
            title = `Runes ${pageName}`;
        }
    }

    useEffect(() => {
        document.body.setAttribute("lang", lang);
    }, [lang]);

    return (
        <>
            <MetaTags
                metaData={{
                    title,
                    url: `https://runes.asia${router.asPath}`,
                    description:
                        pageProps.seo?.description ||
                        "We are creative people, in a creative space called Creative Studio, dedicated to helping brands, products and services become the best in their respective classes.",
                    image:
                        pageProps.seo?.image || //
                        "https://runes.asia/banner.png",
                    themeColor: "#EFD09E",
                    keywords: "runes, creative, agency, studio, production, house, indonesia, tangerang, jakarta",
                    author: "Runes, Rafly Maulana",
                    charSet: "utf-8",
                    language: "English",
                    icons: [
                        {
                            src: "/images/icon-32x32.png",
                            sizes: "32x32",
                            type: "image/png",
                        },
                        {
                            src: "/images/icon-64x64.png",
                            sizes: "64x64",
                            type: "image/png",
                        },
                        {
                            src: "/images/icon-128x128.png",
                            sizes: "128x128",
                            type: "image/png",
                        },
                        {
                            src: "/images/icon-256x256.png",
                            sizes: "256x256",
                            type: "image/png",
                        },
                    ],
                }}
            />

            <ProgressBar color={pageProps.themeColor} />

            <Component {...pageProps} />

            {process.env.NODE_ENV === "production" && (
                <>
                    <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-226878673-1" />
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-226878673-1');
                        `}
                    </Script>
                </>
            )}
        </>
    );
};

export default App;
