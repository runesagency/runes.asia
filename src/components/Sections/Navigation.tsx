import LangChooser from "@/components/Utils/LangChooser";
import Button from "@/components/Utils/Button";
import * as Branding from "@/components/Images/Branding";

import Link from "next/link";

import { useState } from "react";
import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/components/navigation";

type NavigationProps = {
    light?: boolean;
    className?: string;
};

export default function Navigation({ className }: NavigationProps) {
    // const [open, setOpen] = useState(false);
    const { locale } = useLanguage("lang", localization);

    return (
        <nav className={`relative z-50 font-poppins text-black ${className}`}>
            <section className="relative w-full flex justify-between items-center">
                <Link href="/">
                    <a>
                        <Branding.LogoPrimary className={`h-8 md:h-10 cursor-pointer fill-current`} />
                    </a>
                </Link>

                <div className="flex items-center gap-12">
                    <div className="flex gap-8">
                        {locale.links.map((link, index) => (
                            <a href={link.href} key={index}>
                                <h2 className="hover:opacity-70 duration-200 cursor-pointer">{link.name}</h2>
                            </a>
                        ))}
                    </div>

                    <LangChooser hideNameOnMobile />

                    <Button>Let's Get Started</Button>
                </div>
            </section>
        </nav>
    );
}
