import Navigation from "@/components/Sections/Navigation";
import Footer from "@/components/Sections/Footer";

import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/index";
import { theme } from "tailwind.config";

export default function AboutPage() {
    const teams = [
        {
            image: "/images/characters/Rafly.png",
            backgroundColor: theme.colors.navy,
            name: "Rafly Maulana",
            role: "Designer, Developer",
            shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin nec augue at ultrices. Suspendisse potenti. Fusce blandit vel diam quis suscipit.",
        },
        {
            image: "/images/characters/Dayven.png",
            backgroundColor: theme.colors.lime,
            name: "Dayven Althaafah",
            role: "Designer, Illustrator",
            shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin nec augue at ultrices. Suspendisse potenti. Fusce blandit vel diam quis suscipit.",
        },
        {
            image: "/images/characters/Sultan.png",
            backgroundColor: theme.colors.yellow.light,
            name: "Sultan Rafie H.",
            role: "Manager, KOL Master",
            shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin nec augue at ultrices. Suspendisse potenti. Fusce blandit vel diam quis suscipit.",
        },
        {
            image: "/images/characters/Yoga.png",
            backgroundColor: theme.colors.pink,
            name: "Yoga Fakhri N.",
            role: "Marketer, Manager, KOL Master",
            shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin nec augue at ultrices. Suspendisse potenti. Fusce blandit vel diam quis suscipit.",
        },
    ];

    return (
        <main className="relative bg-white">
            {/* Header */}
            <section className="relative py-20 bg-contain bg-no-repeat bg-right-bottom bg-lime" style={{ backgroundImage: "url(/images/illustrations/windy.png)" }}>
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-11 text-black max-w-2xl">
                        <h1 className="jumbo-title whitespace-pre-line">Redefining Brand New Experiences For Brands & Users.</h1>

                        <div className="grid grid-cols-2 subtitle text-justify gap-10">
                            <p>We believe that every process should be simple and easy for everyone to understand.</p>
                            <p>And we also believe that great products should be delivered to everyone regardless of market level or anything.</p>
                        </div>

                        <div className="flex gap-16 pt-10 subtitle underline">
                            <a href="#0" className="hover:opacity-70 duration-300">
                                Behind The Runes
                            </a>
                            <a href="#0" className="hover:opacity-70 duration-300">
                                The Great Journey
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="py-20">
                <div className="container flex gap-56 items-center justify-center">
                    <div className="grid gap-11 max-w-lg text-black">
                        <h2 className="title">Small Team With High Values</h2>
                        <p className="font-poppins text-justify">
                            Founded in the early of 2022, we found that so many brands or products are doing the same things as other businesses. As a result, these brands almost got no exclusivity at
                            all.
                            <br />
                            <br />
                            Knowing that, we, at Runes, dedicating ourselves to helping brands & users creating a better identity for their business, products, or services.
                        </p>
                    </div>

                    <img src="/images/others/store.png" alt="store" className="w-1/3" />
                </div>
            </section>

            {/* Teams */}
            <section className="py-20">
                <div className="container grid gap-16 text-black">
                    <h2 className="title text-center">Meet The Masterminds</h2>

                    <div className="grid grid-cols-4 gap-11 w-full">
                        {teams.map((person, index) => (
                            <article key={index} className="grid gap-7 w-full h-max">
                                <div className="aspect-square w-full pt-10" style={{ backgroundColor: person.backgroundColor }}>
                                    <img src={person.image} alt="" className="h-80 mx-auto object-contain" />
                                </div>

                                <div className="grid gap-4 font-poppins h-max">
                                    <h3 className="text-4xl font-bold">{person.name}</h3>
                                    <span className="text-sm opacity-70">{person.role}</span>
                                    <p className="text-justify">{person.shortDescription}</p>
                                </div>

                                <a className="font-poppins border-b border-current w-max hover:opacity-70 duration-200 cursor-pointer h-max">More About {person.name.split(" ")[0]}</a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
