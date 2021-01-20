import * as mysql from 'mysql';

//await?
export const connection = mysql.createConnection({
  host: 'aws-tinyurl.cppbeuypt4xk.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'amirA123',
  database: 'Tiny_URL'
});