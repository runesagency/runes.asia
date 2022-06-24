import * as Icon from "@/components/Images/Icons";
import * as Branding from "@/components/Images/Branding";

import Link from "next/link";

import * as localization from "@/lib/localization/components/sections/footer";
import { useLanguage } from "@/lib/hooks";
import LangChooser from "@/components/Utils/LangChooser";

export const Contacts = () => {
    const contacts = [
        {
            icon: Icon.Mail,
            text: "hello@runes.asia",
            href: "mailto:hello@runes.asia",
        },
        {
            icon: Icon.Phone,
            text: "+62 851 5658 2791 (WhatsApp Only)",
            href: "tel:+6285156582791",
        },
        {
            icon: Icon.Location,
            text: "Jl. Inpres Raya No.5, Kelurahan Gaga, Larangan, Tangerang, Banten, Indonesia 15154",
            href: "https://goo.gl/maps/3KybSxpnfC67cQ3YA",
        },
    ];

    return (
        <div className="grid gap-6 group">
            {contacts.map((contact, index) => (
                <a
                    key={index}
                    href={contact.href}
                    title={contact.text}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-start items-center gap-7 group-hover:opacity-50 hover:!opacity-100 duration-200"
                >
                    <contact.icon className="w-7 flex-shrink-0 fill-yellow-light" />
                    <p className="font-poppins">{contact.text}</p>
                </a>
            ))}
        </div>
    );
};

export const Socials = () => {
    const socials = [
        {
            name: "Behance",
            icon: Icon.Behance,
            href: "https://www.behance.net/wearerunes",
        },
        {
            name: "Github",
            icon: Icon.Github,
            href: "https://github.com/wearerunes",
        },
        {
            name: "Tiktok",
            icon: Icon.Tiktok,
            href: "https://tiktok.com/@wearerunes",
        },
        {
            name: "Instagram",
            icon: Icon.Instagram,
            href: "https://instagram.com/wearerunes",
        },
    ];

    return (
        <div className="grid gap-7 grid-cols-5 group">
            {socials.map((social, index) => (
                <a key={index} title={social.name} href={social.href} target="_blank" rel="noreferrer">
                    <social.icon className="h-8 fill-yellow-light group-hover:opacity-50 hover:!opacity-100 duration-200" />
                </a>
            ))}
        </div>
    );
};

export default function Footer() {
    const { locale } = useLanguage("lang", localization);

    return (
        <footer className="bg-black text-white py-20">
            <section className="container grid gap-32">
                <div className="flex flex-col gap-20 lg:flex-row justify-between items-start">
                    <div className="grid gap-8 max-w-xs">
                        <Link href={"/"}>
                            <a>
                                <Branding.LogoPrimary className="h-11 cursor-pointer fill-yellow-light" />
                            </a>
                        </Link>
                        <LangChooser className="w-max" tooltipAlign="left" />
                        <Socials />
                    </div>

                    <div className="max-w-xs grid gap-8">
                        <h1 className="text-4xl font-vidaloka text-yellow-light">{locale.contact.title}</h1>
                        <Contacts />
                    </div>

                    <div className="max-w-xs grid gap-8">
                        <h1 className="text-4xl font-vidaloka text-yellow-light">{locale.links.title}</h1>

                        <div className="grid gap-3 text-xl group font-poppins">
                            {locale.links.list.map((link, index) => (
                                <Link key={index} href={link.href}>
                                    <a className="group-hover:opacity-50 hover:!opacity-100 duration-200">{link.name}</a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-10 md:flex-row justify-between md:items-center font-poppins">
                    <p>{locale.copyright}</p>
                    <p>{locale.attribution}</p>
                </div>
            </section>
        </footer>
    );
}
