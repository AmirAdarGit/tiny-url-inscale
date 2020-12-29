import  {connection} from "../database.mysql.connection/connection"

export const addNewUrlToMysql = (url: String, tinyUrl:String, userEmail:String):void =>{
    connection.query(`INSERT INTO Tiny_URL.Links VALUES ('${url}', '${tinyUrl}', '${userEmail}')`
    ,(err:Error, rows: String) => {
      if(err) throw err;
    
      console.log('Data received from Db:');
      console.log('New short url insert to the DB')
      console.log(rows);
    });
  }

export const addNewUserToMysql = (userEmail: String, userName:String, userPasswor:String):void =>{
    connection.query(`INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPasswor}')`
    ,(err:Error, rows: String) => {
      if(err) throw err;
    
      console.log('Data received from Db:');
      console.log('New user insert to the DB');
      console.log(rows);
    });
  }


















