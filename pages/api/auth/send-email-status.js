import nodemailer from "nodemailer";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, status } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: `"UST IREB Research Portal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Status Update",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>UST IREB Research Portal Access Token Email Template</title>
            <style type="text/css">
              body, table {
                font-family: 'Poppins', Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #eaeaea;
              }
              .container {
                max-width: 500px;
                width: 90%;
                margin: 10px auto;
                background-color: #ffffff;
                border-radius: 30px;
                overflow: hidden;
              }
              .header img {
                width: 100%;
                height: auto;
                max-height: 200px;
                object-fit: cover;
              }
              .content {
                padding: 80px 20px;
                color: #121212;
                text-align: center;
              }
              .content h1 {
                font-size: 36px;
                font-weight: bold;
                color: #fcbf15;
                margin: 20px 0 10px 0;
              }
              .content h2 {
                margin: 10px 0 20px 0;
                font-weight: bold;
                font-size: 20px;
              }
              .content p {
                margin: 0;
                font-size: 16px;
              }
              .button {
                background-color: #fcbf15;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 25px;
                border-radius: 30px;
                display: inline-block;
                font-size: 16px;
                margin-top: 20px;
              }
              /* Responsiveness */
              @media (max-width: 600px) {
                .content {
                  padding: 50px 10px;
                }
                .content h1 {
                  font-size: 28px;
                }
                .content h2 {
                  font-size: 18px;
                }
                .content p {
                  font-size: 14px;
                }
              }
            </style>
          </head>
          <body>
            <table width="100%" bgcolor="#eaeaea" style="padding: 80px 0;">
              <tr>
                <td align="center">
                  <table class="container" width="500" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="header" style="text-align: center;">
                        <img src="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1730726678/email-header.png" alt="Header Image" />
                      </td>
                    </tr>
                    <tr>
                      <td class="content">
                        <p>Welcome to UST IREB Research Portal!</p>
                        <h1>Status Update:</h1>
                        <h2>${status}</h2>
                        <p>The status of your submission has been updated. <br/> You may check by viewing your submission <br/> in the "View Submissions" tab. Thank you.</p>
                        <a href="" target="_blank" class="button">
                          Redirect to Research Portal
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html></p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
