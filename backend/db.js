const mysql = require("mysql2");

const connection = mysql.createConnection(
    process.env.MYSQL_PUBLIC_URL
);

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
        return;
    }

    console.log("MySQL Connected Successfully");
});

module.exports = connection;