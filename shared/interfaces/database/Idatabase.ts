export interface Idatabase{
    Connect(host: string, user:string, password:string, database: string): void
    Execute<T>(query: string) : Promise<T>
}