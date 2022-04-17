import * as Icon from "@/components/Icons";

import Link from "next/link";

export default function Footer() {
    const contacts = [
        {
            icon: Icon.Mail,
            text: "hello@runes.asia",
            href: "mailto:hello@runes.asia",
        },
        {
            icon: Icon.Phone,
            text: "+62 851 5658 2791",
            href: "tel:+6285156582791",
        },
        {
            icon: Icon.Location,
            text: "Jl. Inpres Raya No.5, Kelurahan Gaga, Larangan, Tangerang, Banten, Indonesia 15154",
            href: "https://goo.gl/maps/w8dPhEbQcCEZHTAR7",
        },
    ];

    const socials = [
        {
            name: "Figma",
            icon: Icon.Figma,
            href: "https://figma.com/@wearerunes",
        },
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
            name: "Youtube",
            icon: Icon.Youtube,
            href: "#",
        },
        {
            name: "WhatsApp",
            icon: Icon.WhatsApp,
            href: "https://wa.me/6285156582791",
        },
        {
            name: "Instagram",
            icon: Icon.Instagram,
            href: "https://instagram.com/wearerunes",
        },
        {
            name: "LinkedIn",
            icon: Icon.LinkedIn,
            href: "https://www.linkedin.com/company/wearerunes/",
        },
        {
            name: "Facebook",
            icon: Icon.Facebook,
            href: "#",
        },
    ];

    const links = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "About Us",
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
    ];

    return (
        <footer id="footer" className="grid gap-32 text-yellow-light">
            <div className="flex flex-col space-y-20 lg:space-y-0 lg:flex-row justify-between items-start">
                <div className="grid gap-10 max-w-xs">
                    <Link href={"/"}>
                        <a>
                            <img src="/images/logo-full.svg" alt="logo" className="h-11" />
                        </a>
                    </Link>

                    <div className="grid gap-6 group">
                        {contacts.map((contact, index) => (
                            <a
                                key={index}
                                href={contact.href}
                                title={contact.text}
                                target="_blank"
                                rel="noreferrer"
                                className="flex justify-start items-center space-x-7 group-hover:opacity-50 hover:!opacity-100 duration-200"
                            >
                                <contact.icon className="w-7 flex-shrink-0 fill-current" />
                                <p className="paragraph">{contact.text}</p>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="grid gap-7 grid-cols-5 group">
                    {socials.map((social, index) => (
                        <a key={index} title={social.name} href={social.href} target="_blank" rel="noreferrer">
                            <social.icon className="h-8 md:h-10 fill-current group-hover:opacity-50 hover:!opacity-100 duration-200" />
                        </a>
                    ))}
                </div>

                <div className="grid gap-4 md:gap-6 font-lora text-2xl md:text-3xl font-bold group tracking-wide">
                    {links.map((link, index) => (
                        <Link key={index} href={link.href}>
                            <a className="group-hover:opacity-50 hover:!opacity-100 duration-200">{link.name}</a>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row justify-between md:items-center">
                <p className="paragraph text-center">Copyright © 2022 Runes. All Rights Reserved.</p>

                <a
                    onClick={() => window.scrollTo(0, 0)} //
                    className="flex space-x-3 justify-center items-center bg-yellow-light px-6 py-3 rounded-md hover:opacity-75 duration-200 cursor-pointer"
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.75 22C2.02065 22 1.32118 21.7103 0.805456 21.1945C0.289731 20.6788 0 19.9793 0 19.25V2.75C0 2.02065 0.289731 1.32118 0.805456 0.805456C1.32118 0.289731 2.02065 0 2.75 0H19.25C19.9793 0 20.6788 0.289731 21.1945 0.805456C21.7103 1.32118 22 2.02065 22 2.75V19.25C22 19.9793 21.7103 20.6788 21.1945 21.1945C20.6788 21.7103 19.9793 22 19.25 22H2.75ZM11.6875 15.8125V7.84712L14.6383 10.7992C14.7022 10.8632 14.7781 10.9139 14.8616 10.9485C14.9451 10.9831 15.0346 11.0009 15.125 11.0009C15.2154 11.0009 15.3049 10.9831 15.3884 10.9485C15.4719 10.9139 15.5478 10.8632 15.6117 10.7992C15.6757 10.7353 15.7264 10.6594 15.761 10.5759C15.7956 10.4924 15.8134 10.4029 15.8134 10.3125C15.8134 10.2221 15.7956 10.1326 15.761 10.0491C15.7264 9.96556 15.6757 9.88967 15.6117 9.82575L11.4867 5.70075C11.4229 5.63673 11.347 5.58593 11.2635 5.55127C11.18 5.51661 11.0904 5.49877 11 5.49877C10.9096 5.49877 10.82 5.51661 10.7365 5.55127C10.653 5.58593 10.5771 5.63673 10.5133 5.70075L6.38825 9.82575C6.25916 9.95484 6.18663 10.1299 6.18663 10.3125C6.18663 10.4951 6.25916 10.6702 6.38825 10.7992C6.51734 10.9283 6.69243 11.0009 6.875 11.0009C7.05757 11.0009 7.23266 10.9283 7.36175 10.7992L10.3125 7.84712V15.8125C10.3125 15.9948 10.3849 16.1697 10.5139 16.2986C10.6428 16.4276 10.8177 16.5 11 16.5C11.1823 16.5 11.3572 16.4276 11.4861 16.2986C11.6151 16.1697 11.6875 15.9948 11.6875 15.8125Z"
                            fill="#292525"
                        />
                    </svg>

                    <p className="text-black text-sm font-bold font-lora">Scroll To Top</p>
                </a>
            </div>
        </footer>
    );
}
