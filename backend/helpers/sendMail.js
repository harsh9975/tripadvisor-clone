const nodemailer = require('nodemailer')
const { SMTP_EMAIL,SMTP_PASS} = process.env;

const sendMail = async (email,mailSubject,content)=>{
    try{
        const transport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:SMTP_EMAIL,
                pass:SMTP_PASS
            }
        })
        const mailOptions = {
            from:SMTP_EMAIL,
            to:email,
            subject:mailSubject,
            html:content
        }
        transport.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log('Mail sent successfully'+info.response)
            }
        })
    }catch(error){
        console.log(error.message)
    }

}

module.exports = sendMail
