const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
};

module.exports = { connect };


// const mysql = require('mysql');

// //Khởi tao kết nối với MySQL Server

// var con = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'kazan99@',
//     database: 'hb_education_dev' 
//   });

//   //Tiến hàng kết nối
// function connect() {
//     con.connect(function(err) {
//         if (err) throw err;
//         //Kết nôi thành công
//         console.log("Connected!");
        
//     });
// };

// module.exports = { connect };