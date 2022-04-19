import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import MetaTags from "@/components/MetaTags";

const metaData = {
    title: "Runes | Creative Studio & Agency Based in Indonesia",
    description:
        "We are a group of people gathered in a creative space known as the creative studio. We create various things and help brands, products and services become the best in their respective classes.",
    url: "https://runes.asia",
    image: "https://runes.asia/banner.png",
    themeColor: "#FFC977",
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
    ],
};

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>{metaData.title}</title>
                <MetaTags metaData={metaData} />
            </Head>

            <Component {...pageProps} />
        </>
    );
};

export default App;
