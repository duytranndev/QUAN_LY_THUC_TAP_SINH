const connect = require('../../config/db')


module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `course` ORDER BY name ASC";
        db.query(query,(err,result)=>{
            if(err){
                res.redirect('/');
            }
            //res.render('courses/show');
            res.send(result);
            //res.render("")
        })
    },
}


