import nodemailer from 'nodemailer'

export const mailer = async (mailOptions) => {
  let port = process.env.MAIL_PORT
  const transporter = nodemailer.createTransport({
    port: port,
    host: process.env.MAIL_HOST,
    // auth: {
    //   user: process.env.MAIL_USER,
    //   pass: process.env.MAIL_PASSWORD,
    // },
    tls: {
      rejectUnauthorized: false,
    },
  })

  mailOptions.from = process.env.EMAIL_NO_REPLY
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      throw Error(err)
    } else {
      console.log('mail sent: %s', info.messageId)
      return true
    }
  })
}
