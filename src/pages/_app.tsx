import type { AppProps } from "next/app";

import "../styles/globals.css";

import Head from "next/head";
import Script from "next/script";
import MetaTags from "@/components/Utils/MetaTags";

import { useRouter } from "next/router";
import { ucWords } from "@/lib/functions";

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    const metaData = {
        title: router.pathname === "/" ? "Runes - Indonesian Based Creative Studio" : `Runes - ${ucWords(router.pathname.replace("/", ""))}`,
        description: "We are creative people, in a creative space called Creative Studio, dedicated to helping brands, products and services become the best in their respective classes.",
        url: "https://runes.asia",
        image: "https://runes.asia/banner.png",
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
    };

    return (
        <>
            <Head>
                <title>{metaData.title}</title>
                <MetaTags metaData={metaData} />
            </Head>

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
