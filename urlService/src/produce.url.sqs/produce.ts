import  * as AWS  from "aws-sdk"


export class UrlProducer {

    sqs: AWS.SQS;
    queueUrl: string;

    constructor(region: string, queueUrl: string){
        AWS.config.update({region: region})
        this.sqs = new AWS.SQS({ apiVersion: '2012-11-05'})
        this.queueUrl = queueUrl;
    }


    async ProduceShortUrl(email: string, shortUrl: string, longUrl: string) {
        console.log("User-Service, send the Email to SQS");
        const params = {
            MessageBody: String(`${email} ${shortUrl} ${longUrl}`),
            QueueUrl: this.queueUrl
        }
        try {
            await this.sqs.sendMessage(params, function(err: Error, data:any){
                if (err) {
                    return new Promise((req, rej) => { rej(err)})
                } else {
                    console.log("Success", data.MessageId);
                }
            })
        } catch (ex) {
            return new Promise((req, rej) => { rej(ex)})
        }
    }
}