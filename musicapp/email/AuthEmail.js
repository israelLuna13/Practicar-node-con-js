import { transport } from "../config/nodemailer.js";
export class AuthEmail{
    static sendConfirmationEmail= async(user)=>{
          const email = await transport.sendMail({
      from: "MusicApp <admin@musicapp.com>",
      to: user.email,
      subject: "MusicApp - Confirm your account",
      html: `
            <p>Hi ${user.name},you have created your account in MusicApp</p>
            <p>Follow the next link to confirm your account</p>
            <a href="#">Confirm account</a>
            <p>Write token: <b>${user.token}</b></p>
                `,
    });
    }
}