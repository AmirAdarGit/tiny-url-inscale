import  * as AWS  from "aws-sdk"
import * as nodemailer  from 'nodemailer'
import { Consumer } from 'sqs-consumer' 


const app = Consumer.create({
  queueUrl: 'https://sqs.eu-central-1.amazonaws.com/204375983547/email',
  handleMessage: async (message: any) => {
    console.log(message.Body); 
    await sendEmail(message.Body)  
  }
})
app.on('error', (err: Error) => {
  console.error(err.message);
});

app.on('processing_error', (err: Error) => {
  console.error(err.message);
});

app.start();



async function sendEmail(userEmail: string): Promise<void>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tiny.url.in.scaile@gmail.com',
      pass: 'amiradar12345'
    }
  });
  
  var mailOptions = {
    from: 'tiny.url.in.scaile@gmail.com',
    to: userEmail,
    subject: 'Welcome To Tiny Url App',
  
    html:  `<h1>Hey ${userEmail.substring(0, userEmail.lastIndexOf("@"))}</h1>
    <p>Thanks for signing up to the "Tiny url in scale" app.<br>
    Now you can generate a short url from any given url.<br>
    For additional updates and features you will receive an email alert.<br>
    Have fun :).</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}















// AWS.config.update({region: 'eu-centeral-1'})
// var sqs = new AWS.SQS({ apiVersion: '2012-11-05'})

// export const getUserEmail = async function () {
//     console.log("Email-Produce-Service, resiving the Email from SQS");
//     const params = {
//         QueueUrl: "https://sqs.eu-central-1.amazonaws.com/204375983547/email"
//     };
//     await sqs.receiveMessage(params, function(err: Error, data){
//         if(err){
//             console.log("Error", err);
//         } else {
//             console.log("aaa");
//             if(data.Messages){
//                 data.Messages.forEach(msg => {
//                     console.log(msg);
//                     console.log("bbb");
//                 })
//             }
//         }
//     })
// }

// getUserEmail();