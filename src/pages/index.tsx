import * as Icon from "@/components/Icons";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import ScrollContainer from "react-indiana-drag-scroll";
import Link from "next/link";

import { theme } from "../../tailwind.config";
import ContactForm from "@/components/ContactForm";

const Heading = ({ title, description, className }: { title: string; description: string; className?: Record<"container" | "title" | "description", string> }) => {
    return (
        <div className={`grid gap-2 mx-auto max-w-2xl text-center ${className?.container}`}>
            <h1 className={`title text-linear-yellow bg-gradient-to-r ${className?.title}`}>{title}</h1>
            <p className={`paragraph text-white max-w-md mx-auto ${className?.description}`}>{description}</p>
        </div>
    );
};

export default function HomePage() {
    const services = [
        {
            title: "Design",
            description: "Graphic, Illustration, UI/UX, 3D Art",
            icon: Icon.Design,
        },
        {
            title: "Development",
            description: "Application, Website, API, Chatbot, AR/VR",
            icon: Icon.Development,
        },
        {
            title: "Marketing",
            description: "SEO, Media Advertisements",
            icon: Icon.Marketing,
        },
        {
            title: "Social Media Marketing",
            description: "WhatsApp, Instagram",
            icon: Icon.SMM,
        },
        {
            title: "Branding",
            description: "Design, Marketing, Development, Management",
            icon: Icon.Branding,
        },
    ];

    const values = [
        {
            title: "Quality",
            description: "We always provide the highest quality service and even strive to exceed the expectations of our clients.",
            icon: Icon.Quality,
        },
        {
            title: "Excellence",
            description: "We always use the latest technology and the best way to produce high enough quality.",
            icon: Icon.Excellence,
        },
        {
            title: "Creativity",
            description: "We will give you a unique idea, which will make your product or service stand out from the competition.",
            icon: Icon.Creativity,
        },
        {
            title: "Collaborative",
            description: "We open a discussion room with our clients & partners as the work progresses, so that the results can meet the expectations of both parties.",
            icon: Icon.Collaborative,
        },
    ];

    const clients = [
        {
            name: "Araloka Studios",
            logoId: "araloka",
            href: "https://aralokastudios.com/",
        },
        {
            name: "Feby Putri",
            logoId: "febyputri",
            href: "https://byncrecords.com/",
        },
        {
            name: "Briton English Education",
            logoId: "briton",
            href: "https://britonenglish.co.id/",
        },
        {
            name: "Madaya Group",
            logoId: "madaya",
            href: "https://madayagroup.com/",
        },
        {
            name: "Duta Bahasa Inggris By Briton",
            logoId: "dbibybriton",
            href: "https://dbi.britonenglish.co.id/",
        },
        {
            name: "Tune Discord Bot",
            logoId: "tune",
            href: "https://tunebot.org",
        },
        {
            name: "Harvport",
            logoId: "harvport",
            href: "https://harvport.com/",
        },
        {
            name: "Indiespices",
            logoId: "indiespices",
            href: "https://indiespices.com/",
        },
    ];

    return (
        <main className="bg-black">
            {/* Header */}
            <header className="container">
                <Navigation />
            </header>

            {/* Intro */}
            <section id="intro" className="relative">
                {/* Rectangle */}
                <svg className="absolute top-0 -left-10 lg:left-0 h-full fill-transparent from-yellow-light to-yellow-medium bg-gradient-to-b" width="76" height="422" viewBox="0 0 76 422">
                    <rect width="76" height="422" />
                </svg>

                {/* Content */}
                <div className="container pl-8 md:pl-24 flex justify-between items-center mt-16 mb-8">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-el-messiri max-w-xl xl:max-w-3xl text-linear-yellow bg-gradient-to-b">Empowering Brands To The Fullest.</h1>

                    {/* Icons */}
                    <div className="hidden md:flex justify-evenly items-center h-44 lg:h-72 xl:h-[400px] -space-x-[50%]">
                        <img src="/images/logo-mark.svg" alt="logo" className="h-full" />
                        <img src="/images/logo-mark.svg" alt="logo2" className="h-full opacity-50" />
                        <img src="/images/logo-mark.svg" alt="logo3" className="h-full opacity-10" />
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="relative z-10">
                {/* Map */}
                <div className="absolute top-0 left-0 transform -translate-x-1/3 z-0">
                    <img src="/images/utils/map.png" alt="map" className="hidden xl:block" />
                    <img src="/images/utils/map-no-marker.png" alt="map" className="xl:hidden" />
                </div>

                {/* Content */}
                <div className="relative container pl-8 md:pl-24 pt-20 z-10 grid gap-24">
                    {/* Icons */}
                    <div className="flex justify-between items-center w-full max-w-xl lg:max-w-full ml-auto text-yellow-light fill-current">
                        <Icon.Branding className="w-10" />
                        <Icon.Design className="w-10" />
                        <Icon.Marketing className="w-10" />
                        <Icon.Development className="w-10" />
                        <Icon.SMM className="w-10" />
                    </div>

                    {/* About */}
                    <div className="grid gap-5 lg:ml-auto max-w-xl pb-24 font-lora text-2xl leading-normal">
                        {/* Text 1 */}
                        <p className="text-yellow-light">
                            <b>We are creative people</b>, in a creative space called Creative Studio, dedicated to helping brands, products and services become the best in their respective classes.
                        </p>

                        {/* Text 2 */}
                        <p className="text-white">
                            We are established and growing in Tangerang City, Banten, <span>Indonesia</span> since 2022, and we will continue to strive to provide the best quality and maximum level of
                            satisfaction.
                        </p>

                        {/* Button */}
                        <Link href={`/about`}>
                            <a className="button">Learn More About Us</a>
                        </Link>
                    </div>
                </div>

                {/* Peoples */}
                <div className="container flex flex-col items-stretch">
                    {/* Persons */}
                    <img src="/images/characters/stacked-vertical.png" alt="people" className="w-full md:hidden" />
                    <img src="/images/characters/stacked-horizontal.png" alt="people" className="w-full hidden md:block" />

                    {/* Bottom Line */}
                    <div className="from-yellow-medium via-yellow-light to-yellow-medium bg-gradient-to-b h-1 w-full" />
                </div>
            </section>

            {/* Services */}
            <section id="services" className="relative py-32">
                {/* Content */}
                <div className="relative container grid gap-24 z-10">
                    <Heading //
                        title="What We Do"
                        description="We provide various things from Design to AR/VR Experiences to fulfill the solutions to any problems."
                    />

                    {/* Services */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
                        {services.map((service, index) => (
                            <article key={index} className="grid gap-5 w-72 text-center mx-auto">
                                <service.icon className="w-8 mx-auto fill-yellow-light" />
                                <h3 className="text-yellow-light text-4xl font-lora font-bold mx-auto leading-tight">{service.title}</h3>
                                <p className="paragraph text-white mx-auto">{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Spotlight 1 */}
                <svg className="spotlight left-0 origin-bottom-left" style={{ animationDirection: "alternate" }} viewBox="0 0 1919 1080">
                    <path opacity="0.3" d="M0.5 979.5V1080H119L1918.5 220.5V0H385L0.5 979.5Z" fill="url(#spotlight1)" />

                    <defs>
                        <linearGradient id="spotlight1" x1="548" y1="1080" x2="548" y2="-0.00013015" gradientUnits="userSpaceOnUse">
                            <stop stopColor={theme.colors.yellow.light} />
                            <stop offset="1" stopColor={theme.colors.black} />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Spotlight 2 */}
                <svg className="spotlight right-0 origin-bottom-right" style={{ animationDirection: "alternate-reverse" }} viewBox="0 0 1919 1080">
                    <path opacity="0.3" d="M1918 979.5V1080H1799.5L0 220.5V0H1533.5L1918 979.5Z" fill="url(#spotlight2)" />

                    <defs>
                        <linearGradient id="spotlight2" x1="1370.5" y1="1080" x2="1370.5" y2="-0.00013015" gradientUnits="userSpaceOnUse">
                            <stop stopColor={theme.colors.yellow.light} />
                            <stop offset="1" stopColor={theme.colors.black} />
                        </linearGradient>
                    </defs>
                </svg>
            </section>

            {/* Portfolio */}
            <section id="portfolio" className="relative grid gap-16 pb-32">
                {/* Portofolios */}
                <ScrollContainer className="max-w-full">
                    <section className="relative grid grid-cols-2 w-max gap-6">
                        {Array(2)
                            .fill(0)
                            .map((_, index) => (
                                <section key={index} className="relative grid grid-rows-2 grid-cols-7 gap-4 xl:gap-6 h-72 xl:h-96 w-screen min-w-[1080px]">
                                    <div className="col-span-1 row-span-1 bg-white mx-auto h-full w-full" />
                                    <div className="col-span-1 row-span-1 bg-white mx-auto h-full w-full" />
                                    <div className="col-span-2 row-span-2 bg-white mx-auto h-full w-full" />
                                    <div className="col-span-2 row-span-2 bg-white mx-auto h-full w-full" />
                                    <div className="col-span-1 row-span-1 bg-white mx-auto h-full w-full" />
                                    <div className="col-span-2 row-span-1 bg-white mx-auto h-full w-full" />
                                    <div className="col-span-1 row-span-1 bg-white mx-auto h-full w-full" />
                                </section>
                            ))}
                    </section>
                </ScrollContainer>

                {/* More Button */}
                <div className="flex flex-col md:flex-row justify-center items-center mx-auto space-y-5 md:space-y-0 md:space-x-5">
                    <p className="paragraph text-white">See More of Our Portfolio At:</p>
                    <a href="https://behance.net/wearerunes" target={"_blank"} rel="noreferrer" className="button">
                        behance.net/wearerunes
                    </a>
                </div>
            </section>

            {/* Values */}
            <section id="values" className="relative pb-48">
                {/* Content */}
                <div className="relative container grid gap-20 z-10">
                    {/* Icons */}
                    <div className="flex justify-between items-center max-w-xl w-full mx-auto fill-yellow-light stroke-yellow-light">
                        <Icon.Excellence className="h-11" />
                        <Icon.Collaborative className="h-11" />
                        <Icon.Quality className="h-11" />
                        <Icon.Creativity className="h-11" />
                    </div>

                    <Heading //
                        title="We Deliver The Project At Its Finest"
                        description="We always apply 4 main points in the quality of our workmanship, to ensure that our work meets our best standards."
                    />

                    {/* List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full">
                        {values.map((value, index) => (
                            <article key={index} className="flex flex-col justify-between items-start space-y-14">
                                {/* Description */}
                                <div className="grid gap-4">
                                    <h2 className="font-el-messiri text-4xl font-bold text-yellow-light">{value.title}</h2>
                                    <p className="paragraph text-white">{value.description}</p>
                                </div>

                                {/* Icon */}
                                <value.icon className="h-12 fill-yellow-light" />
                            </article>
                        ))}
                    </div>
                </div>

                {/* Pattern 1 */}
                <img src="/images/utils/dots-horizontal.svg" alt="" className="dots-pattern top-0 left-0" />

                {/* Pattern 2 */}
                <img src="/images/utils/dots-vertical.svg" alt="" className="dots-pattern bottom-0 right-0" />
            </section>

            {/* Clients */}
            <section id="clients" className="relative overflow-hidden">
                {/* Content */}
                <div className="relative container grid gap-20 z-30 pb-12">
                    <Heading //
                        title="Those Who Works With Us"
                        description="Those who put their trust in us to grow their brand to the top."
                    />

                    {/* List */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 w-full group max-w-5xl mx-auto">
                        {clients.map((client, index) => (
                            <a href={client.href} target="_blank" rel="noreferrer" key={index} className="relative m-auto group-hover:opacity-50 hover:!opacity-100 duration-200 bg-opacity-75">
                                <img src={`/images/clients/${client.logoId}.png`} alt={client.name} className="w-64 lg:w-auto" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Logomark 1 */}
                <div className="hidden xl:block absolute w-24 bottom-0 left-0 z-20 transform translate-x-20 xl:translate-x-10 2xl:translate-x-24 3xl:translate-x-60 -translate-y-32">
                    <img src="/images/logo-mark.svg" alt="logo-mark" className="animate-[floating_5s_infinite_2s]" />
                </div>

                {/* Logomark 2 */}
                <div className="hidden lg:block absolute w-56 bottom-0 left-0 z-0 transform -translate-x-20 3xl:translate-x-10 -translate-y-96">
                    <img src="/images/logo-mark.svg" alt="logo-mark" className="animate-[floating_8s_infinite]" />
                </div>

                {/* Logomark 3 */}
                <img src="/images/logo-mark.svg" alt="logo-mark" className="hidden lg:block absolute max-w-xl w-full bottom-0 right-0 transform translate-x-48 translate-y-1/3 z-0" />

                {/* Divider */}
                <svg className="relative w-full object-cover fill-yellow-light z-10 -mb-1" viewBox="0 0 1920 265">
                    <path d="M0 0V130V265.5H1920V130V45.8333C1170.27 94.1662 749.881 86.466 0 0Z" />
                </svg>
            </section>

            {/* Contact */}
            <section id="contact" className="relative overflow-hidden from-yellow-light to-yellow-medium bg-gradient-to-b pb-24">
                {/* Content */}
                <div className="container">
                    <div className="max-w-2xl ml-auto grid gap-12">
                        <Heading //
                            title="Nothing Great Is Made Alone"
                            description="Something great are always made together, so why don’t we do it together?"
                            className={{
                                container: "!text-left",
                                title: "!text-black",
                                description: "mx-0 !text-black",
                            }}
                        />

                        <ContactForm />
                    </div>
                </div>

                <div className="hidden lg:block absolute h-full top-0 left-0 transform -translate-x-96 3xl:-translate-x-1/4">
                    <img src="/images/utils/rocket-outline-horizontal.svg" alt="" className="xl:hidden" />
                    <img src="/images/utils/rocket-outline.svg" alt="" className="hidden xl:block " />
                </div>
            </section>

            {/* Footer */}
            <section className="relative py-24 container">
                <Footer />
            </section>
        </main>
    );
}
