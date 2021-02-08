import  * as AWS  from "aws-sdk"

AWS.config.update({region: 'eu-centeral-1'})
var sqs = new AWS.SQS({ apiVersion: '2012-11-05'})

export const sendUserEmail = async function (userEmail: string) {
    console.log("User-Service, send the Email to SQS");
    const params = {
        MessageBody: userEmail,
        QueueUrl: "https://sqs.eu-central-1.amazonaws.com/204375983547/email"
    }
    await sqs.sendMessage(params, function(err: Error, data){
        if(err){
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    })
}