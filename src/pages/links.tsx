import Link from "next/link";
import LangChooser from "@/components/Utils/LangChooser";
import { Socials } from "@/components/Sections/Footer";
import * as Icon from "@/components/Utils/Icons";
import * as Button from "@/components/Forms/Buttons";

import { theme } from "tailwind.config";
import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/links";

export default function LinksPage() {
    const { locale } = useLanguage("lang", localization);
    const color = [
        theme.colors.lime, //
        theme.colors.yellow.light,
        theme.colors.pink,
    ];

    return (
        <main className="relative bg-white">
            <div className="container lg:max-w-screen-md mx-auto py-20 grid gap-16">
                <header className="grid gap-11 md:px-16 py-20 text-black border-b border-black border-opacity-20">
                    <div className="flex justify-between items-center">
                        <Icon.LogoPrimary className="h-16 fill-current" />

                        <Link href="/" passHref>
                            <Button.Primary className="hidden md:block">{locale.header.button}</Button.Primary>
                        </Link>
                    </div>

                    <div className="grid gap-7">
                        <LangChooser className="w-max" />
                        <p className="font-poppins text-justify">{locale.header.description}</p>
                        <Socials className="w-max" />
                    </div>
                </header>

                {locale.sections.map((section, index) => (
                    <div key={index} className="grid gap-10 p-8 md:p-10 text-black" style={{ backgroundColor: color[index] }}>
                        <header className="flex flex-col md:flex-row gap-8 items-center">
                            <img src={section.image} alt="" className="h-32 w-32 object-cover object-center" />

                            <div className="grid gap-1 h-max  text-center md:text-left">
                                <h3 className="font-vidaloka text-4xl">{section.title}</h3>
                                <p className="font-poppins">{section.subtitle}</p>
                            </div>
                        </header>

                        <div className="grid gap-5">
                            {section.links.map((link, index) => (
                                <Button.Secondary key={index} className="!w-full" href={link.url}>
                                    {link.title}
                                </Button.Secondary>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
