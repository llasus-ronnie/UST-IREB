import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, token } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Access Token for UST IREB Research Portal",
      html: `
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>UST IREB Research Portal Access Token Email Template</title>
              <style type="text/css">
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

                body, table, .container {
                  font-family: 'Poppins', Helvetica, Arial, sans-serif;
                }
                body {
                  margin: 0;
                  padding: 0;
                  background-color: #eaeaea;
                }
                .container {
                  max-width: 500px;
                  width: 90%;
                  margin: 30px auto 0;
                  background-color: #ffffff;
                  border-radius: 20px;
                  overflow: hidden;
                  text-align: center;
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
                .button-container {
                  text-align: center;
                  margin: 20px 0;
                }
                .button {
                  background-color: #fcbf15;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 10px 25px;
                  margin: 20px 0 0 0;
                  border-radius: 30px;
                  display: inline-block;
                  font-size: 16px;
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
            <body style="margin:0; padding:0; background-color:#eaeaea;">
              <div class="container" style="background-color: #ffffff; padding: 0;">
                <div class="header">
                  <img src="public/images/unauthorized/email-header.png" alt="Header Image" />
                </div>
                <div class="content">
                  <p>Welcome to UST IREB Research Portal!</p>
                  <h1>Access Token:</h1>
                  <h2>${token}</h2>
                  <p>Use the access token above to sign in <br/> and set up your password.</p>
                  <a href="https://google.com" target="_blank" class="button" style="background-color: #fcbf15; color: #ffffff;">
                    Redirect to Research Portal
                  </a>
                </div>
              </div>
            </body>
          </html>
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
