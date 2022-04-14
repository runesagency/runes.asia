import Link from "next/link";
import MenuIcon from "@/components/Icons/Menu";
import LangChooser from "@/components/LangChooser";
import { useState } from "react";

export default function Navigation() {
    const [open, setOpen] = useState(false);

    const links = [
        {
            name: "About",
            href: "/about",
        },
        {
            name: "Services",
            href: "/services",
        },
        {
            name: "Projects",
            href: "/projects",
        },
        {
            name: "Contact",
            href: "/contact",
        },
        {
            name: "Links",
            href: "/links",
        },
    ];

    return (
        <nav className="relative">
            <section className="relative w-full flex justify-between items-center pt-20">
                <Link href="/" passHref>
                    <img src="/images/logo-full.svg" alt="logo" className="h-10 cursor-pointer" />
                </Link>

                <div className="flex items-center space-x-8 text-yellow-light">
                    <LangChooser />
                    <MenuIcon active={open} onClick={() => setOpen(true)} />
                </div>
            </section>

            <section
                className={`fixed top-0 right-0 h-screen bg-gradient-to-b from-yellow-light to-yellow-medium z-[999] transition-all delay-500 duration-500 transform  ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="relative h-full w-full z-20 flex flex-col justify-between items-end pl-20 pr-10 pt-20 pb-10">
                    <MenuIcon active={open} onClick={() => setOpen(false)} />

                    <div className="grid gap-6 ">
                        {links.map((link, index) => (
                            <a href={link.href} key={index}>
                                <h2 className="font-el-messiri text-5xl font-bold text-right text-black hover:opacity-70 duration-200 cursor-pointer">{link.name}</h2>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="absolute top-0 right-0 bg-[url(/images/bg-curl.png)] bg-no-repeat h-full w-full" />
            </section>
        </nav>
    );
}
