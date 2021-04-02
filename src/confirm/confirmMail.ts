import * as nodemailer from 'nodemailer';

import * as sgMail from '@sendgrid/mail';



export const sendEmail = async (email:string, link:string)=>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: `${process.env.MY_MAIL}`, // Change to your recipient
      from: email, // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
    

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.sendgrid.net',
    //     port: 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //       user: 'apikey', // generated ethereal user
    //       pass: process.env.SENDGRID_API_KEY, // generated ethereal password
    //     },
    //   });
    
    //   // send mail with defined transport object
    //   const info = await transporter.sendMail({
    //     from:process.env.MY_MAIL, // sender address
    //     to: email, // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: `<b>Hello world?</b> <a href="${link}">confirm Email</a>`, // html body
    //   });
}