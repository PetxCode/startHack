import { google } from "googleapis";
import nodemailer from "nodemailer"
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1054310070984-bqesvn0ftgmhcn6p6292jskt91rk4n5e.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
    "1//04dIMtDvNwamFCgYIARAAGAQSNwF-L9IrFJgJO7AzsDu8l4eJ0xQq5VcPSg9TL3sYVHufYPXj-inHC6ApFpP7hvl8goZR32Cd9TY";
  
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const url: string = "localhost:3366";

export const congratulation = async (email: string, prize: number) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "georgeseo06@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    console.log(email);
    const mailOptions = {
      from: "One Bet ❤❤❤ <georgeseo06@gmail.com>",
      to: email,
      subject: "Congratulaions",
      html: `<p>
      <strong> Congratulations Your prediction just won yourself a cash prize of ₦${prize} fro Maverick Bet!</strong>
        </p>`,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};
