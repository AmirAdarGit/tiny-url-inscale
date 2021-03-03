export interface ISqsProducer {
    SqSProduce<T>(obj: T): void;
}