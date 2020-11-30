const path = require('path');
const express = require('express');
const morgan = require('morgan');
var handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes/index');

//Xử lý static file
app.use(express.static(path.join(__dirname, '/public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
); // gửi dữ liệu bằng form lên thì dùng thằng này để xử lý
app.use(express.json()); // gửi từ code JS lên thì dùng thằng này để xử lý

//HTTP logger
app.use(morgan('combined'));

// Template Engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

//Trỏ tới vị trí của views hoặc các thư mục mục khác để tìm kiếm
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
