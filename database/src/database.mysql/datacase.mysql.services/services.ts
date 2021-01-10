import  {connection} from "../database.mysql.connection/connection"

export const addNewUrlToMysql = (url: String, userEmail:String):void =>{
    connection.query(`INSERT INTO Tiny_URL.Links (LongURL, Email)
    VALUES ('${url}', '${userEmail}');`
    ,(err:Error, rows: String) => {
      if(err) return new Error;
    
      console.log('Data received from Db:');
      console.log('New short url insert to the DB')
      console.log(rows);
    });
  }

export const addNewUserToMysql = (userEmail: String, userName:String, userPasswor:String):void =>{
    connection.query(`INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPasswor}')`
    ,(err:Error, rows: String) => {
      if(err) return new Error;;
    
      console.log('Data received from Db:');
      console.log('New user insert to the DB');
      console.log(rows);
    });
  }






  export const getUserInfo  = (email: string):void =>{
    connection.query(`SELECT * FROM Tiny_URL.Users where Email = '${email}' `
    ,(err:Error, rows: String) => {
      if(err) return new Error;;
    
      console.log('Data received from Db:');
      console.log('Getting the user info');
      console.log(rows);
    });
  }

  export const getUrlInfo  = async (shortUrl: String):Promise<Boolean> =>{
    var flag = true;
    await connection.query(`SELECT LongUrl FROM Tiny_URL.Links where ShortURL = '${shortUrl}' `,
    (err:Error, rows: String) => {
      if(err) return new Error;;
      console.log('DB answer: ');

      if(rows.length == 0){
        console.log("error doesnt find the url in the Database!")
        flag = false;
    }
      else
      { 
        console.log(rows);
        flag = true;
      }
    });
    console.log("flag value: "+ flag); //print this line first 
    return flag;
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














