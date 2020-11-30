const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    // })

    // app.get('/news', (req, res) => {
    //   res.render('news');
    // })

    // app.get('/search', (req, res) => {
    //   res.render('search');
    // })
    app.post('/search', (req, res) => {
        //console.log(req.query);//query được coi giống như MiddleWare đã được Express xây dựng sẵn
        console.log(req.body); // Lấy dữ liệu từ formData, nhưng body chưa được xây dựng => phải khai báo => xem bên trên

        //res.render('search');
        res.send('');
        // //Trả lại màn hình 1 màn hình trắng khi gọi đến thằng này
    });

    // app.post('/search', (req, res) => {
    //   res.render('search');
    // })

    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
