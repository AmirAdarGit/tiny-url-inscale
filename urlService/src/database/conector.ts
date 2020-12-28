const mysql = require('mysql');

export const connection = mysql.createConnection({
  host: 'aws-tinyurl.cppbeuypt4xk.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'amirA123',
  database: 'AWS-TinyURL'
});
export const connectorLogs = connection.connect((err: Error) => {
  if (err) throw err;
  console.log('Connected!');
});