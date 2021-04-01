// import  * as AWS  from "aws-sdk"
// import * as nodemailer  from 'nodemailer'
// import { Consumer } from 'sqs-consumer' 


// const newUrlConsumer = Consumer.create({
//     queueUrl: process.env.AWS_SQS_NEW_SHORT_URL,
//     //attributeNames : ['All'] ,
//     //messageAttributeNames : ['Name'],
//     handleMessage: async (message: any) => {
//         console.log("Consumer module: ", message.Body ); 
//         const arg = String(message.Body).split(" "); 
//         console.log("Consumer module: ", arg); 
//         await sendEmail(arg[0], arg[1], arg[2]);  
//     }, 
// })
// newUrlConsumer.on('error', (err: Error) => {
//     console.error(err.message);
// });

// newUrlConsumer.on('processing_error', (err: Error) => {
//     console.error(err.message);
// });

// newUrlConsumer.start();

// async function sendEmail(userEmail: string, shortUrl: string, longUrl:string): Promise<void>{
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.MANAGE_EMAIL_USERNAME,
//             pass: process.env.MANAGE_EMAIL_PASSWORD
//         }
//     });

//     var mailOptions = {
//         from: process.env.MANAGE_EMAIL_USERNAME,
//         to: userEmail,
//         subject: 'New Short URL Link', 
//         html:  `<h1>Hey ${userEmail.substring(0, userEmail.lastIndexOf("@"))}</h1>
//                 <p>Long URL: ${longUrl} <br> 
//                   Short URL: ${shortUrl}</p>`
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('New link sent: ' + info.response);
//         }
//     });
// }



 