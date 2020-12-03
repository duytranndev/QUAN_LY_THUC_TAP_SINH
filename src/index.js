const path = require('path');
const mysql = require('mysql');
const express = require('express');
const morgan = require('morgan');
var handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes/index');
//const db = require('./config/db')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "duy123",
    database: "quan_ly_thuc_tap_sinh",
    port: 3306,
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connect to database");
});

global.db = db;


//Xử lý static file
app.use(express.static(path.join(__dirname,'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
); // gửi dữ liệu bằng form lên thì dùng thằng này để xử lý
app.use(express.json()); // gửi từ code JS lên thì dùng thằng này để xử lý

//lay du lieu bang parameter
//req.query."name-day la thuoc tinh muon lay"
//req.params."ten thuoc tinh"

//HTTP logger
app.use(morgan('combined'));

// Template Engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

//Trỏ tới vị trí của views hoặc các thư mục  khác để tìm kiếm
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
