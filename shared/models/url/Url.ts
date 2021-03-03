export class Url{
    shortUrl?: string;
    longUrl: string;
    email: string;
    isPrivate: boolean;

    constructor(longUrl?:string, email?: string, isPrivate?: boolean, shortUrl?: string){
        this.longUrl = longUrl;
        this.email = email;
        this.isPrivate = isPrivate;
        this.shortUrl = shortUrl;
    }
}
