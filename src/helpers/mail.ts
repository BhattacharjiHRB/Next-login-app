

import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs'


export const sendEmail = async ({email, emailType, userId }: any) =>{
    try {
        // Create Hashed Token
       const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpires: Date.now()+3600000
            })
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpires: Date.now()+3600000
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "37b4cd314db5ba",
              pass: "3b5ae60ad6b615",

            }
          });

          const mailOptions = {
            from: 'hrittik02@gmail.com',
            to : email,
            subject: emailType ==='VERiFY' ? "Verify Your Email" : "Reset your password",
            html : `<P> Click <a href="${process.env.DOMAIN!}/verifyemail?token=${hashedToken}">here </a> to${emailType} ==='VERiFY' ? "Verify Your Email" : "Reset your password"</P>`
          };

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}