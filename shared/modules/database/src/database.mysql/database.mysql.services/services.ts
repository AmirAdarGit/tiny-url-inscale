import { ErrorRequestHandler } from 'express';
import { MysqlError } from 'mysql';
import { connection } from '../database.mysql.config/connection'
import * as util from "util"

export const cheackIfLongUrlExsist = (url: String): Promise<boolean> => {
  return new Promise((isExist) => {
    connection.query(`SELECT * FROM Tiny_URL.Links where LongURL = '${url}'`
    ,(err:Error, rows: String) => {
      
      if(JSON.stringify(rows) == "[]")
      {
        return isExist(false);
      }
      else{
        return isExist(true);
      }
    })
  });
}

export const cheackIfShortUrlExsist = (id: String): Promise<boolean> => {
  return new Promise((isExist) => {
    connection.query(`SELECT * FROM Tiny_URL.Links where ShortURL = '${id}'`
    ,(err:Error, rows: String) => {
      
      if(JSON.stringify(rows) == "[]")
      {
        return isExist(false);
      }
      else{
        return isExist(true);
      }
    })
  });
}



export const addNewUrlToMysql = async (url: String, userEmail:String):Promise<String> => {
      console.log(url);
      console.log(userEmail);
      return new Promise ((urlNumber) => {
      connection.query(`INSERT INTO Tiny_URL.Links (LongURL, Email) VALUES ('${url}', '${userEmail}');`
    ,(err:Error, rows: String) => {
      if(err) return new Error;
      console.log('New short url insert to the DB')
      console.log(JSON.stringify(rows));
    });
      return urlNumber("success!");
    })
}

export const addNewUserToMysql = async (postUserQuery: string): Promise<void> => {
  
  const query = util.promisify(connection.query).bind(connection);
    return await query(postUserQuery);

  }


  export const getUserPassword  = (getUserQuery: string):Promise<String> =>{
    return new Promise ((resolve, reject) => {
      connection.query(getUserQuery ,(err:Error, rows: String) => {
      if(err) {
        return reject(err);
      }
      console.log('Data received from Db:');
      console.log('Getting the user info');
      console.log(rows);
      return resolve(JSON.stringify(rows));
    });
  });
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


  export const getUrlInfo  = async (shortUrl: String):Promise<String> =>{
    return new Promise((exist) => {
      connection.query(`SELECT LongUrl FROM Tiny_URL.Links where ShortURL = '${shortUrl}' `,
    (err:Error, rows: String) => {
      if(err) return new Error;
      return exist(JSON.stringify(rows));
    })
  });
}

export const getShortUrlNumber  = async (url: String):Promise<String> =>{
  return new Promise((exist) => {
    connection.query(`SELECT ShortURL FROM Tiny_URL.Links where LongURL = '${url}' `,
  (err:Error, rows: String) => {
    if(err) return new Error;
    return exist(rows);
  })
});
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














