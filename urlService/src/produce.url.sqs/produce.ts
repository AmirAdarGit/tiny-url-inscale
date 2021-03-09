import  * as AWS  from "aws-sdk"
import { ISqsProducer } from "../../../shared/interfaces/sqsProducer"
import  * as errors  from "../url/errors";

export class NewUrlProducer implements ISqsProducer {

    sqs: AWS.SQS;
    queueUrl: string;

    constructor(region: string, queueUrl: string){
        AWS.config.update({region: region})
        this.sqs = new AWS.SQS({ apiVersion: '2012-11-05'})
        this.queueUrl = queueUrl;
    }

    async SqSProduce<T>(obj: T): Promise<void> {
        console.log("User-Service, send the Email to SQS");
        const params = {
            MessageBody: String(obj),
            QueueUrl: this.queueUrl
        }
        await this.sqs.sendMessage(params, function(err: Error, data:any){
            if (err) {
                return new Promise((req, rej) => { rej(new errors.SQSError("Error produce to SQS"))})
            } else {
                console.log("Success", data.MessageId);
            }
        })
    }
}