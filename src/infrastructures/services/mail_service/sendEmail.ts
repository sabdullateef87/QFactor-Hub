import nodemailer from "nodemailer";
export let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'abdul.test87@gmail.com',
        pass: "daethhejjuexydwp"
    }
});


interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}

export const sendEmail = async ({ to, subject, text }: EmailOptions) => {
    await transporter.sendMail({
        from: 'abdul.test87@gmail.com',
        to,
        subject,
        text
    });
}