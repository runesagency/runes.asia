import CTA from "@/components/Sections/CTA";
import * as Button from "@/components/Utils/Buttons";
import * as Icon from "@/components/Images/Icons";

import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/components/sections/newsletterCta";

export default function NewsletterCTA() {
    const { locale } = useLanguage("lang", localization);

    return (
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
                <h1 className="jumbo-title whitespace-pre-line">{locale.title}</h1>
                <p className="subtitle text-justify">{locale.subtitle}</p>
            </div>

            <form className="grid font-poppins max-w-xl">
                <div className="w-full flex gap-6 items-center border border-black border-opacity-20 pl-5 bg-white">
                    <Icon.Mail className="fill-current h-5" />
                    <input type={"email"} placeholder="Your Email Account" className="py-4 w-full outline-none font-poppins" />
                </div>

                <Button.Primary className="!w-full !rounded-none">{locale.button}</Button.Primary>
            </form>

            <p className="font-poppins">{locale.notice}</p>
        </CTA>
    );
}
