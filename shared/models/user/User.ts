export class User {
    email: string
    password: string


    constructor(userObj: any){
        this.email = userObj.Email;
        this.password = userObj.Password;
    }
    print(){
        console.log(`email: ${this.email} \n password: ${this.password}`)
    }
}