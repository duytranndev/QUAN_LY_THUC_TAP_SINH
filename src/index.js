const path = require('path');
const express = require('express');
const morgan = require('morgan');
var handlebars  = require('express-handlebars');
const app = express();
const port = 3000;

//Xử lý static file
app.use(express.static(path.join(__dirname+'/public')));

//HTTP logger
app.use(morgan('combined'));

// Template Engine 
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

//Trỏ tới vị trí của views hoặc các thư mục mục khác để tìm kiếm
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname,'resource','views'));


app.get('/', (req, res) => {
    res.render('home');
})
app.get('/news', (req, res) => {
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})