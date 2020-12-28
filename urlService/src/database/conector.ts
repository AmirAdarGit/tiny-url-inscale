const mysql = require('mysql');

export const connection = mysql.createConnection({
  host: 'aws-tinyurl.cppbeuypt4xk.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'amirA123',
  database: 'Tiny_URL'
});
export const connectorLogs = connection.connect((err: Error) => {
  if (err) throw err;
  //example of url
  const url = "https://www.google.co.il/search?hl=en&sxsrf=ALeKk02dPBzIObTsIf32-i-wMycZusg9Pw%3A1609167303230&ei=x_HpX_XIDbHAlAaw6amIBg&q=try&oq=try&gs_lcp=CgZwc3ktYWIQAzIICAAQyQMQkQIyBQgAEJECMgIIADICCAAyAggAMgIIADICCC4yAggAMgIIADICCAA6BAgjECc6BwgAEMkDEAo6BAgAEAo6CAgAELEDEIMBOgsILhCxAxDHARCvAToFCC4QsQM6CwgAELEDEIMBEJECOgUIABCxA1DpHFjVHmDNIGgBcAB4AYABowKIAbYIkgEFMC4zLjKYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwi1yPir9_DtAhUxIMUKHbB0CmEQ4dUDCA0&uact=5";
  const email = "amir@gmail.com";
  const shotrUrl = generateShortUrl(url, email);

  addUrlToMysql(url, shotrUrl, email);
  console.log('Connected!');
});

const generateShortUrl = (url: String, email: String): String =>{
  return "amiradarUrl.com";
}

//INSERT INTO Tiny_URL.Links
//VALUES ('https://www.gmail.com/asdfasfasffsdm0c&index=3', 'https://tinyurl.com/fsadfasfas', 'amir@gmail.com');



const addUrlToMysql = (url: String, tinyUrl:String, user:String):void =>{
  
  connection.query(`INSERT INTO Tiny_URL.Links VALUES ('${url}', '${tinyUrl}', '${user}')`
  ,(err:Error, rows: String) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
  });
}
