import nodemailer from "nodemailer"
import { email } from "../type/type";


const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const VerifyEmail = async ({ email, id }: email) => {

    const Mail = {
        from: {
            name: "Alik laha",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Verify Your Email",
        text: "Hello world?",
        html: "<h1>Verify Your Email</h1>" +
            "<p>For confirming your email Type this Verification code</p> <br/>" +
            `<p>${id}</p><br/>` +
            "<p>Type this in The input field <br/> if not working then login again</p> <br/>" +
            "<p>if you did not request this code please ignore this email</p>",
    }

    return await transport.sendMail(Mail)

}

export const LoggedIn = async ({ email, id }: email) => {
    console.log(email, id)
    const Mail = {
        from: {
            name: "Alik laha",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Loggedin User",
        text: "Hello (Namaste)",
        html: "<h1>You are Now Logged in</h1>" +
            `<p>From the Email ${email} </p> <br/>`,
    }

    return await transport.sendMail(Mail)

}


