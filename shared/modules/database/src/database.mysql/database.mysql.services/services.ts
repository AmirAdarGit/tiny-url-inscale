import { ErrorRequestHandler } from 'express';
import * as mysql from 'mysql'
import { connection } from '../database.mysql.config/connection'
import { User } from "../../../../../models/user/index"

import * as util from "util"

export const GetUserPassword  = async (getUserQuery: string):Promise<string> =>{

  const query = util.promisify(connection.query).bind(connection);
    try{
      const row = await query(getUserQuery);
        var resultArray = row[0].UserPassword; 
        return resultArray;
      
    } catch{
      return 'not_Such_User_On_DB';
    }
}

export const getLinkInfo =  async (checkQuery: string): Promise<string> => {
  const query = util.promisify(connection.query).bind(connection);
  try{
    const row = await query(checkQuery);
    if(JSON.stringify(row) == '[]'){
      return 'not_Such_Link_On_DB';
    }
    else{
      return row;  
      }
  } catch (ex){
    return ex;
  }
}


export const cheackIfUrlExsist =  async (longUrl: string): Promise<boolean> => {
  const query = util.promisify(connection.query).bind(connection);
  try{
    const row = await query(longUrl);
      if(JSON.stringify(row) == '[]'){
        return false;
      }
      else{
        return true;
      }
    } catch (ex) {
        return ex;
    }
  }


export const getUrl  = async (getQuery: string):Promise<string> =>{
  const query = util.promisify(connection.query).bind(connection);
    try {
      const row = await query(getQuery);
        if(row == []) {
          return "";
        }
        else {
           return row
        }
  } catch (ex) {
    return ex;
  }
}



export const addNewUrlToMysql = async (createQuery: string):Promise<void> => {
  const query = util.promisify(connection.query).bind(connection);
  return await query(createQuery);
}


export const addNewUserToMysql = async (postUserQuery: string): Promise<void> => {
  
  // the util.promisify is change the return calback function, base node colback api, 
  // to promise base api.
  const query = util.promisify(connection.query).bind(connection);
  return await query(postUserQuery);

  }




export const getAllUserUrls  = (email: any):Promise<String> =>{
  return new Promise ((allUrl) => {
    connection.query(`SELECT ShortURL, LongURL from Tiny_URL.Links WHERE Email = '${email}'`
  ,(err:Error, rows: String) => {
    if(err) return new Error;
  
    console.log('Data received from Db:');
    console.log('Getting the user info');
    for(var i = 0; i<rows.length; i++){
      console.log(rows[i]);
    }
    return allUrl(JSON.stringify(rows));
  });
  
})
}







  export const removeShortUrlFromTable  = (shortUrl: String):void =>{
    connection.query(`DELETE FROM Tiny_URL.Links WHERE ShortURL = '${shortUrl}'`
    ,(err:Error, rows: String) => {
      if(err) return new Error;;

      console.log("the shortUrl " + shortUrl + " has been remmoves from the database");

      console.log(rows);
    });
  }


  export const removeUesrFromUsersTable = (email: String): void => {
    connection.query(`DELETE FROM Tiny_URL.Users WHERE Email = '${email}'`
    ,(err:Error, rows: String) => {
      if(err) throw err;
      
      console.log("the user " + email + " has been remmoves from the database");
      console.log(rows);
    });
  }














