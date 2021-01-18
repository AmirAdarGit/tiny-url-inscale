import axios from "axios"
import { IUserServiceHttpClient } from "../../interfaces/user.interface/user"
import { Credentials, UserMetadata, Token } from '../../interfaces/sheard.interfaces/Isheard';

export class UserServiceHttpClient implements IUserServiceHttpClient {

    async getEncriptedUserPass(credentials: Credentials): Promise<String> {
        return this.get<String>("http://localhost:8070/api/user", { ...credentials })
    }

    async addUserToDB(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        
        return this.post<void>("http://localhost:8070/api/user", newUser)
    }

    async post<T>(url: string, payload: object): Promise<T> {
        const response = await axios.post<T>(url, payload);
        
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject() )
        }

        return response.data
    }

    async get<T>(url: string, payload: object): Promise<T> {
        const response = await axios.get<T>(url, payload);
        
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject() )
        }

        return response.data
    }

}