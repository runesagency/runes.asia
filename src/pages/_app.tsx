import type { AppProps } from "next/app";

import "../styles/globals.css";

import Head from "next/head";
import MetaTags from "@/components/Utils/MetaTags";
import Script from "next/script";

import * as Button from "@/components/Utils/Buttons";

const metaData = {
    title: "Runes | Creative Studio Based in Indonesia",
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

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>{metaData.title}</title>
                <MetaTags metaData={metaData} />
            </Head>

            {process.env.NODE_ENV === "production" ? (
                <div className="w-full h-full min-h-screen flex items-center flex-col gap-6 max-w-lg mx-auto text-center text-black py-20">
                    <img src="/images/illustrations/hand-rising.png" alt="" className="max-w-sm" />

                    <p className="font-poppins leading-relaxed text-sm">Hi There! Thanks for coming, but currently,</p>
                    <h1 className="font-vidaloka text-5xl leading-snug">Website is Under Maintenance</h1>

                    <p className="font-poppins leading-relaxed">Something great is coming next week! We'll be back with all the new stuff you can find. Curious? Just wait and see 😄.</p>
                    <p className="font-poppins leading-relaxed font-bold">Meanwhile, if you have any inquiries, just let us know at:</p>

                    <Button.Secondary as="a" href="https://instagram.com/runes.asia" target={"_blank"} rel="noreferrer">
                        📷 Instagram
                    </Button.Secondary>

                    <Button.Secondary as="a" href="mailto:team@runes.asia" target={"_blank"} rel="noreferrer">
                        📧 Email
                    </Button.Secondary>
                </div>
            ) : (
                <Component {...pageProps} />
            )}

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
