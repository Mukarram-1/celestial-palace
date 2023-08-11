const mysql=require('mysql');
const connection=mysql.createConnection({
    host:'bb6g2fut50zfyrfu4iav-mysql.services.clever-cloud.com',
    user:'ukooiagyq7w4h8xd',
    password:'ihVyYhmoIATXdAMOrpjT',
    database:'bb6g2fut50zfyrfu4iav',
    port:'3306',
})

connection.connect((error)=>{
    if(error)
    {
        console.log(error);
    }else
    {
        console.log("Database Connected");
    }
})
module.exports={connection};