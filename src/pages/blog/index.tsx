import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";
import * as Button from "@/components/Utils/Buttons";
import * as Icon from "@/components/Images/Icons";

import { useState } from "react";
import CTA from "@/components/Sections/CTA";

const articleTitles = [
    "Dear UI Designer, yok bisa yok belajar bikin copy sendiri",
    "Ketika kamu bingung mengisi konten pada eksplorasi design mu",
    "Berlatih UX Writing dengan Prinsip Dasar Microcopy",
    "Cara cepat belajar design landing page",
    "Pertimbangkan branding sebelum menambahkan faktor delightful",
    "Referensi Design 02: Halaman detail artikel pada blog",
    "Cara memakai inspirasi dari referensi",
];

export default function BlogPage() {
    const [articles] = useState(
        Array.from({ length: 10 }).map((_, index) => ({
            id: index,
            title: articleTitles[Math.floor(Math.random() * articleTitles.length)],
            image: `https://www.dwinawan.com/blog/thumb_article${index + 1}.jpg`,
            // random date and month like "1 February 2022"
            date: `${Math.floor(Math.random() * 31)} ${
                ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Math.floor(Math.random() * 12)]
            } 2022`,
            category: ["Illustrations", "Web Development", "Case Studies"][Math.floor(Math.random() * 3)],
            shortDescription:
                "Lupakan sejenak Lorem Ipsum saat mengisi teks pada design UI mu. Coba buat copy mu sendiri. Buat rekan kerja UX Writer lebih happy saat bekerja.Lupakan sejenak Lorem Ipsum saat mengisi teks pada design UI mu. Coba buat copy mu sendiri. Buat rekan kerja UX Writer lebih happy saat bekerja.Lupakan sejenak Lorem Ipsum saat mengisi teks pada design UI mu. Coba buat copy mu sendiri. Buat rekan kerja UX Writer lebih happy saat bekerja.",
        }))
    );

    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [searchText, setSearchText] = useState("");

    const categories = articles.reduce((acc, article) => {
        if (!acc.includes(article.category)) {
            acc.push(article.category);
        }

        return acc;
    }, []);

    const articleFilter = (article: typeof articles[0]) => {
        if (categoryFilters.length > 0) {
            if (categoryFilters.includes(article.category)) {
                return true;
            }
            return false;
        }

        if (searchText.length > 0) {
            if (article.title.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
            return false;
        }

        return true;
    };

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-black">
                <div className="container grid gap-14">
                    <Navigation light={true} />

                    <div className="grid xl:grid-cols-2 gap-12 xl:max-h-[660px] group">
                        <a href={`/blog/${articles[0].id}`} className="grid place-content-start gap-7 group-hovered">
                            <img src={articles[0].image} alt={articles[0].title} className="flex-shrink" />

                            <div className="grid gap-4 text-white">
                                <h1 className="text-4.5xl font-vidaloka leading-snug">{articles[0].title}</h1>
                                <p className="subtitle max-h-full line-clamp-3">{articles[0].shortDescription}</p>
                                <span className="opacity-60 font-poppins">
                                    {articles[0].category} / {articles[0].date}
                                </span>
                            </div>

                            <hr className="border-white opacity-30 xl:hidden" />
                        </a>

                        <div className="grid md:grid-cols-3 xl:grid-cols-1 gap-6 max-h-full">
                            {articles.slice(1, 4).map((article, index) => (
                                <a key={index} href={`/blog/${article.id}`} className="flex flex-col xl:flex-row flex-shrink gap-6 group-hovered">
                                    <img src={article.image} alt={article.title} className="xl:w-60 object-cover" />

                                    <div className="grid gap-4 text-white">
                                        <h1 className="text-3xl font-vidaloka leading-snug">{article.title}</h1>
                                        <p className="font-poppins max-h-20 line-clamp-2">{article.shortDescription}</p>
                                        <span className="opacity-60 text-sm font-poppins">
                                            {article.category} / {article.date}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="relative py-20">
                <div className="container grid gap-6">
                    <div className="max-w-md flex gap-6 items-center text-black border border-black border-opacity-20 pl-5">
                        <Icon.Magnifier className="fill-current h-5" />
                        <input
                            type={"search"}
                            placeholder="Search Article"
                            className="py-4 w-full outline-none font-poppins"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button.Secondary //
                            onClick={() => setCategoryFilters([])}
                            active={categoryFilters.length === 0}
                        >
                            All
                        </Button.Secondary>

                        {categories.map((category, index) => (
                            <Button.Secondary
                                key={index}
                                onClick={() => {
                                    if (!categoryFilters.includes(category)) {
                                        setCategoryFilters([...categoryFilters, category]);
                                    } else {
                                        setCategoryFilters(categoryFilters.filter((c) => c !== category));
                                    }
                                }}
                                active={categoryFilters.includes(category)}
                            >
                                {category}
                            </Button.Secondary>
                        ))}
                    </div>

                    <div className="grid gap-6 xl:gap-11 md:grid-cols-3 group">
                        {articles
                            .slice(4)
                            .filter(articleFilter)
                            .map((article, index) => (
                                <a key={index} href={`/blog/${article.id}`} className="grid gap-7 h-full place-content-start group-hovered">
                                    <img src={article.image} alt={article.title} className="w-full h-max" />

                                    <div className="flex flex-col gap-4 text-black h-full">
                                        <h1 className="text-3xl font-vidaloka leading-snug flex-1">{article.title}</h1>
                                        <p className="h-full line-clamp-3 font-poppins">{article.shortDescription}</p>
                                        <span className="opacity-60 font-poppins flex-1 text-sm">
                                            {article.category} / {article.date}
                                        </span>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </section>

            {/* Join Newsletter */}
            <CTA
                imageLink="/images/illustrations/fireplace.png"
                className={{
                    wrapper: "bg-pink",
                    rightContainer: "xl:flex-shrink-0",
                    leftContainer: "text-black",
                    image: "xl:object-left",
                }}
            >
                <div className="grid gap-5">
                    <h1 className="jumbo-title whitespace-pre-line">Get The Latest Articles Every Week From Us.</h1>
                    <p className="subtitle text-justify">Enhance your knowledge and explore the world through our writings.</p>
                </div>

                <form className="grid font-poppins max-w-xl">
                    <div className="w-full flex gap-6 items-center border border-black border-opacity-20 pl-5 bg-white">
                        <Icon.Mail className="fill-current h-5" />
                        <input type={"email"} placeholder="Your Email Account" className="py-4 w-full outline-none font-poppins" />
                    </div>

                    <Button.Primary className="!w-full !rounded-none">Join Mailing List</Button.Primary>
                </form>

                <p className="font-poppins">*Don’t worry, we won’t sent you any spam :)</p>
            </CTA>

            <Footer />
        </main>
    );
}
