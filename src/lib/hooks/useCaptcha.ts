import { useEffect, useRef, useState } from "react";

export const useCaptcha = () => {
    const elementRef = useRef<HTMLCanvasElement>(null);
    const value = useRef<string>(null);
    const [render, setRender] = useState(1);

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

        const canv = elementRef.current;
        const ctx = canv.getContext("2d");

        ctx.font = "50px Poppins";
        ctx.strokeText(captcha.join(""), 0, 50);

        value.current = captcha.join("");

        return () => {
            ctx.clearRect(0, 0, canv.width, canv.height);
        };
    }, [render, elementRef]);

    return {
        refresh: () => setRender(render + 1),
        value: value.current,
        elementRef,
    };
};
