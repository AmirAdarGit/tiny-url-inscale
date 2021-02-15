// import { connection } from '../database.mysql.config/connection'
// import * as util from "util"


// export const GetUserPassword  = async (getUserQuery: string): Promise<string> =>{

//   const query = util.promisify(connection.query).bind(connection);
//     try{
//       const row = await query(getUserQuery);
//       if(JSON.stringify(row) == '[]'){
//         return '';
//       }
//         else { 
//         var resultArray = row[0].UserPassword; 
//         return resultArray;
//         }
//     } catch (ex){
//       return ex;  
//     }
// }

// export const getLinkInfo =  async (checkQuery: string): Promise<string> => {
//   const query = util.promisify(connection.query).bind(connection);
//   try{
//     const row = await query(checkQuery);
//     if(JSON.stringify(row) == '[]'){
//       return 'not_Such_Link_On_DB';
//     }
//     else{
//       return row;  
//       }
//   } catch (ex){
//     return ex;
//   }
// }

// export const getUrl  = async (getQuery: string):Promise<string> =>{
//   const query = util.promisify(connection.query).bind(connection);
//     try {
//       const row = await query(getQuery);
//       if(JSON.stringify(row) == '[]'){
//         return "";
//         }
//         else {
//            return row
//         }
//   } catch (ex) {
//     return ex;
//   }
// }


//   // the util.promisify is change the return calback function, base node colback api, 
//   // to promise base api.
// export const addNewUrlToMysql = async (createQuery: string):Promise<string> => {
//   const query = util.promisify(connection.query).bind(connection);
//   try {
//     await query(createQuery);
//     return "";
//   } catch(ex){
//     return ex
//   }
// }


// export const addNewUserToMysql = async (postUserQuery: string): Promise<void> => {
//   const query = util.promisify(connection.query).bind(connection);
//   return await query(postUserQuery);

//   }





//   // export const removeShortUrlFromTable  = (shortUrl: String):void =>{
//   //   connection.query(`DELETE FROM Tiny_URL.Links WHERE ShortURL = '${shortUrl}'`
//   //   ,(err:Error, rows: String) => {
//   //     if(err) return new Error;;

//   //     console.log("the shortUrl " + shortUrl + " has been remmoves from the database");

//   //     console.log(rows);
//   //   });
//   // }


//   // export const removeUesrFromUsersTable = (email: String): void => {
//   //   connection.query(`DELETE FROM Tiny_URL.Users WHERE Email = '${email}'`
//   //   ,(err:Error, rows: String) => {
//   //     if(err) throw err;
      
//   //     console.log("the user " + email + " has been remmoves from the database");
//   //     console.log(rows);
//   //   });
//   // }














