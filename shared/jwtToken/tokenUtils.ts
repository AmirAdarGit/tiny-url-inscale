import { Token } from "../models/authenticate";

export class tokenUtils {

    static getToken(header: string): Token{
        if (header == undefined) {
            return new Token(null);
        }
        return new Token(header.split(" ")[1]);
    }
}