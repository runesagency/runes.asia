import type { NextApiResponse, NextApiRequest } from "next";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "team@runes.asia",
        pass: "uswimesofpkluzkd",
    },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;

    if (req.method === "POST") {
        try {
            await transporter.sendMail({
                from: data.name, // sender address
                to: "team@runes.asia", // list of receivers
                subject: "Bussiness Inquiry", // Subject line
                text: data.message, // html body
            });

            return res.status(200).send("OK");
        } catch (error) {
            return res.status(500).send("Internal Server Error");
        }
    }

    return res.status(405).send("Method Not Allowed");
};

export default handler;
