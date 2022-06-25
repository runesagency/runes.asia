import LangChooser from "@/components/Utils/LangChooser";
import * as Button from "@/components/Utils/Buttons";
import * as Branding from "@/components/Images/Branding";
import * as Icon from "@/components/Images/Icons";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/router";
import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/components/sections/navigation";

type NavigationProps = {
    light?: boolean;
    className?: string;
};

export default function Navigation({ className }: NavigationProps) {
    const [open, setOpen] = useState(false);
    const { locale } = useLanguage("lang", localization);
    const router = useRouter();

    return (
        <nav className={`relative z-50 font-poppins text-black ${className}`}>
            {/* Desktop Relative Menu */}
            <section className="relative w-full flex justify-between items-center">
                <Link href="/">
                    <a>
                        <Branding.LogoPrimary className={`h-8 md:h-10 cursor-pointer fill-current`} />
                    </a>
                </Link>

                <div className="flex items-center gap-6 md:gap-12">
                    <div className="hidden lg:flex gap-8">
                        {locale.links.map((link, index) => (
                            <Link href={link.href} key={index}>
                                <a className={`hover:opacity-70 duration-200 cursor-pointer` + (router.pathname === link.href ? " border-b border-current" : "")}>{link.name}</a>
                            </Link>
                        ))}
                    </div>

                    <LangChooser hideNameOnMobile />
                    <Icon.Menu className="fill-current group cursor-pointer lg:hidden" active={open} onClick={() => setOpen(true)} />
                    <Button.Primary className="hidden xl:block">Let's Get Started</Button.Primary>
                </div>
            </section>

            {/* Mobile Absolute Menu */}
            <section
                className={
                    `fixed lg:hidden py-20 translate-y-0 h-screen transform bottom-0 right-0 z-10 bg-black text-yellow-light flex flex-col justify-end items-end duration-700 delay-300 overflow-clip` + //
                    (open ? " w-screen px-10" : " w-0")
                }
            >
                <Link href="/">
                    <a className="flex-shrink-0">
                        <Branding.LogoPrimary className={`h-12 cursor-pointer fill-current -mr-2 mb-12`} />
                    </a>
                </Link>

                <div className="flex gap-8">
                    {/* Links */}
                    <div className="grid gap-4 text-current font-poppins text-2xl text-right auto-rows-max place-items-end align-bottom h-auto">
                        {locale.links.map((link, index) => (
                            <Link href={link.href} key={index}>
                                <a className={`hover:opacity-70 duration-200 cursor-pointer w-max` + (router.pathname === link.href ? " border-b border-current" : "")}>{link.name}</a>
                            </Link>
                        ))}
                    </div>

                    {/* Close Button */}
                    <div className="h-auto bg-yellow-light flex flex-col justify-center items-center hover:opacity-75 duration-200 cursor-pointer text-black" onClick={() => setOpen(false)}>
                        <p className="transform -rotate-90 origin-center font-bold tracking-wide uppercase">{locale.closeButton}</p>
                        <Icon.Menu className={`fill-current h-3 -rotate-90 origin-center duration-200 ${open ? "mt-6" : "mt-12"}`} active={open} />
                    </div>
                </div>
            </section>
        </nav>
    );
}
