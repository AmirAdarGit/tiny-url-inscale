

export class Utils {

    static async attempt<T>(fn: () => Promise<Attempt<T>>) {
        try {
            await fn();
        } catch (ex) {
            return new Promise((_, reject) => reject(ex))
        }      
    }
}