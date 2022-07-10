import CTA from "@/components/Sections/CTA";
import Input from "@/components/Forms/Input";
import * as Button from "@/components/Forms/Buttons";

import { useLanguage } from "@/lib/hooks";
import { useState } from "react";
import * as localization from "@/lib/localization/sections/newsletterCta";

export default function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const { locale } = useLanguage("lang", localization);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!email) return alert(locale.form.no_email);

        fetch(`/api/cms/items/blog_mailing_list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        }).then(async (res) => {
            if (res.status === 200) {
                setEmail("");
                return alert(locale.form.success);
            }

            if (res.status === 400) {
                const data = await res.json();

                if (data.errors[0].extensions.code === "RECORD_NOT_UNIQUE") {
                    setEmail("");
                    return alert(locale.form.already_registered);
                } else {
                    return alert(locale.form.error);
                }
            }

            return alert(locale.form.error);
        });
    };

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

            <form className="grid font-poppins max-w-xl" onSubmit={handleSubmit}>
                <Input
                    icon="Mail"
                    type={"email"} //
                    name={"email"}
                    placeholder={locale.placeholder}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <Button.Primary as="button" className="!w-full !rounded-none" type="submit">
                    {locale.button}
                </Button.Primary>
            </form>

            <p className="font-poppins">{locale.notice}</p>
        </CTA>
    );
}
