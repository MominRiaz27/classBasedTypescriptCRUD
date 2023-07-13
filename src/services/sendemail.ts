import { NextFunction, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import {CronJob} from 'cron'
import { promises } from 'dns';


export async function emailSend() :Promise<boolean> {
    try {
        let testaccount = nodemailer.createTestAccount()
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure:false,
          auth: {
            user: (await testaccount).user,
            pass: (await testaccount).pass,
          },
        });
        console.log("the mail data is : ",transporter);
        // Send the email
        await transporter.sendMail({
          from: 'Momin.Riaz427@gmail.com',
          to: 'Momin.Riaz427@gmail.com',
          subject: 'New User Created',
          text: 'A new user has been created.',
        }).then((info)=>{
            console.log("info :", info.messageId);
            console.log(" Preview ", nodemailer.getTestMessageUrl(info));
        });

        console.log('Email sent successfully');
        return true;
      } catch (error) {
        console.error('Error sending email:', error);
        return false;
      }
}
