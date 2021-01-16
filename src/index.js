const path = require('path');
const mysql = require('mysql');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const fs = require('fs');
const session = require('express-session');
const route = require('./routes/index');
const db = require('./config/db/dbmongo');

//db.connect();

// db.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log("connect to database");
// });

//global.db = db;

//Xử lý static file
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    }),
);
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    }),
);
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

app.use(methodOverride('_method'));

// Template Engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
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
