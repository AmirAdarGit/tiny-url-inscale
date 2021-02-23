export class tokenUtils {

    
    static getToken(header: string){
        return header.split(" ")[1];
    }
}