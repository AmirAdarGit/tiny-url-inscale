import  * as AWS  from "aws-sdk"
import { ISqsProducer } from "../../shared/interfaces/sqsProducer"

export class SignUpProducer implements ISqsProducer {

    sqs: AWS.SQS;

    constructor(){
        AWS.config.update({region: 'eu-centeral-1'})
        this.sqs = new AWS.SQS({ apiVersion: '2012-11-05'})
    }

    async SqSProduce<T>(email: any): Promise<void> {
        console.log(`Authentiacation-service-Produce, send the Email to SQS with email: ${email}`);
        const params = {
            MessageBody: String(email),
            QueueUrl: process.env.AWS_SQS_URL
        }
        try{
            await this.sqs.sendMessage(params, function(err: Error, data){
                if(err){
                    console.log("Error", err);
                } else {
                    console.log("Success", data.MessageId);
                }
            })
        } catch (ex) {
            console.log(`User-Service-Produce: Error: ${ex}`);
        }
    }
}