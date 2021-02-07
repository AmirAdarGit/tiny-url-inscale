import  * as AWS  from "aws-sdk"

AWS.config.update({region: 'eu-centeral-1'})
var sqs = new AWS.SQS({ apiVersion: '2012-11-05'})

export const getUserEmail = async function () {
    console.log("Email-Produce-Service, resiving the Email from SQS");
    const params = {
        QueueUrl: "https://sqs.eu-central-1.amazonaws.com/204375983547/email"
    };
    await sqs.receiveMessage(params, function(err: Error, data){
        if(err){
            console.log("Error", err);
        } else {
            console.log("aaa");
            if(data.Messages){
                data.Messages.forEach(msg => {
                    console.log(msg);
                    console.log("bbb");
                })
            }
        }
    })
}

getUserEmail();