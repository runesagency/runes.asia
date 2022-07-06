import type { FormEvent, ReactNode } from "react";

import Footer from "@/components/Sections/Footer";
import Navigation from "@/components/Sections/Navigation";
import Input from "@/components/Utils/Input";
import * as Button from "@/components/Utils/Buttons";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/contact";

const FormSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="grid gap-7 w-full">
        <h3 className="text-3xl">{title}</h3>
        {children}
    </div>
);

export default function ContactPage() {
    const { locale } = useLanguage("lang", localization);
    const captchaCanvas = useRef<HTMLCanvasElement>(null);
    const captchaValue = useRef<string>(null);
    const [captchaRender, setCaptchaRender] = useState<number>(1);

    const [selections, setSelections] = useState<string[]>([]);
    const [contactPlatform, setContactPlatform] = useState<string>("");
    const [budget, setBudget] = useState<string>("");

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selections.length === 0) {
            return alert(locale.form.handlers.noSelections);
        }

        if (contactPlatform === "") {
            return alert(locale.form.handlers.noContactPlatform);
        }

        if (budget === "") {
            return alert(locale.form.handlers.noBudget);
        }

        const formData = new FormData((e as any).target);

        const formDataJson: Record<string, any> = {
            selections,
            budget,
            contact_platform: contactPlatform,
        };

        for (const [key, value] of formData.entries()) {
            formDataJson[key] = value;
        }

        if (formDataJson.captcha !== captchaValue.current) {
            return alert(locale.form.handlers.captchaError);
        }

        fetch(`/api/cms/items/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataJson),
        }).then(async (res) => {
            setCaptchaRender((prev) => prev + 1);

            if (res.status === 200) {
                (e.target as any).reset();

                return alert(locale.form.handlers.success);
            }

            return alert(locale.form.handlers.error);
        });
    };

    useEffect(() => {
        const charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
        const lengthOtp = 6;
        const captcha = [];

        for (let i = 0; i < lengthOtp; i++) {
            let index = Math.floor(Math.random() * charsArray.length + 1);

            if (captcha.indexOf(charsArray[index]) == -1) {
                captcha.push(charsArray[index]);
            } else {
                i--;
            }
        }

        const canv = captchaCanvas.current;
        const ctx = canv.getContext("2d");

        ctx.font = "50px Poppins";
        ctx.strokeText(captcha.join(""), 0, 50);

        captchaValue.current = captcha.join("");

        return () => {
            captchaValue.current = null;
            ctx.clearRect(0, 0, canv.width, canv.height);
        };
    }, [captchaRender]);

    return (
        <main className="relative bg-white overflow-auto">
            {/* Header */}
            <section id="header" className="relative py-20">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center">
                        <h1 className="title">{locale.header.title}</h1>
                        <h4 className="subtitle">{locale.header.subtitle}</h4>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="py-20">
                <form className="container grid gap-10 font-poppins text-black lg:max-w-4xl" onSubmit={formHandler.bind(this)}>
                    <FormSection title="Hi Runes, I am:">
                        <Input name="name" placeholder={locale.form.name} required />
                    </FormSection>

                    <FormSection title="And i from:">
                        <Input name="company_name" placeholder={locale.form.companyName} />
                    </FormSection>

                    <FormSection title="And i would like to talk about:">
                        <div className="flex flex-wrap items-center gap-3">
                            {locale.form.selections.map((category, index) => (
                                <Button.Secondary
                                    key={index}
                                    onClick={() => {
                                        if (!selections.includes(category.value)) {
                                            setSelections((prev) => [...prev, category.value]);
                                        } else {
                                            setSelections(selections.filter((c) => c !== category.value));
                                        }
                                    }}
                                    active={selections.includes(category.value)}
                                >
                                    {category.text}
                                </Button.Secondary>
                            ))}
                        </div>
                    </FormSection>

                    <FormSection title="My Email is:">
                        <Input name="email" placeholder={locale.form.email} required />
                    </FormSection>

                    <FormSection title="Of course you can contact me through:">
                        <div className="flex flex-wrap items-center gap-3">
                            {locale.form.contactPlatforms.map((socMed, index) => (
                                <Button.Secondary
                                    key={index} //
                                    onClick={() => setContactPlatform(socMed.value)}
                                    active={contactPlatform.includes(socMed.value)}
                                >
                                    {socMed.text}
                                </Button.Secondary>
                            ))}
                        </div>

                        <Input name="contact_info" placeholder={locale.form.contactInfo} required />
                    </FormSection>

                    <FormSection title="More details about the project is:">
                        <textarea
                            name="details"
                            rows={10}
                            className="p-5 w-full outline-none font-poppins text-black border border-black border-opacity-20"
                            placeholder={locale.form.details}
                            required
                        />
                    </FormSection>

                    <FormSection title="My budget for the project is:">
                        <div className="flex flex-wrap items-center gap-3">
                            {locale.form.budgets.map((b, index) => (
                                <Button.Secondary
                                    key={index} //
                                    onClick={() => setBudget(b.value)}
                                    active={budget.includes(b.value)}
                                >
                                    {b.text}
                                </Button.Secondary>
                            ))}
                        </div>
                    </FormSection>

                    <FormSection title="Captcha:">
                        <canvas ref={captchaCanvas} height={70} width={300} />
                        <a
                            className="underline hover:opacity-70 cursor-pointer duration-200" //
                            onClick={() => setCaptchaRender((prev) => prev + 1)}
                        >
                            Refresh Captcha
                        </a>
                        <Input name="captcha" placeholder={locale.form.captcha} required />
                    </FormSection>

                    <Button.Primary as="button" className="w-full" type="submit">
                        {locale.form.submit}
                    </Button.Primary>
                </form>
            </section>

            <Footer />
        </main>
    );
}
