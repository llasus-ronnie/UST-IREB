import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { rec, title, name, status } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: `"UST IREB Research Portal" <${process.env.EMAIL_USER}>`,
      to: rec,
      subject: "UST IREB Research Portal | Submission",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>UST IREB Research Portal: Status Update</title>
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
                padding: 60px 20px;
                color: #121212;
                text-align: center;
              }
              .content h1 {
                font-size: 36px;
                font-weight: bold;
                color: #fcbf15;
                margin: 10px 0;
              }
              .content h2 {
                margin: 10px 0;
                font-weight: bold;
                font-size: 16px;
              }
              .content p {
                margin: 10px 0;
                font-size: 13px;
              }
              .email-disclaimer {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin: 30px auto 0;
              }
              .email-disclaimer p {
                font-size: 11px;
                font-style: italic;
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
                  padding: 50px 40px;
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
                .email-disclaimer {
                  width: 90%;
                }
                .email-disclaimer p {
                  font-size: 10px;
                  font-style: italic;
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
                        <p>${name} has submitted a research proposal.</p>
                        <h2>This submission is under the status:</h2>
                        <h1>${status}</h1>
                        <p>
                        Log in to the UST IREB Research Portal to review and manage the submission on the "REC Manage Submissions" page.
                        </p>
                        <a href="https://ust-ireb.site" target="_blank" class="button">
                          Redirect to Research Portal
                        </a>
                        <div class="email-disclaimer">
                          <p>
                            This is an automatically generated email, please do not reply.
                          </p>
                        </div>
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
