module.exports = {
    getHomeAdmin: (req, res) => {
        let query = "SELECT * FROM `course` ORDER BY name ASC"; // query database to get all the players
    
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
                res.render('home',{
                    userData: result
                })
            });
    },
}
