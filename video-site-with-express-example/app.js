const express = require('express');

const app = express();

const logger = (req, res, next) => {
    console.log('visited');
    next();
}
// Setting static files
app.use("/public",express.static(__dirname+'/public'))
app.use(logger);

// Setting view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/add_post", (req, res) => {
    res.render('add_post');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at port ${port} ...`);
});