const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();
const Photo = require('./models/Photos');


const logger = (req, res, next) => {
    // Every time a request is made, this middleware will be called
    // console.log('visited');
    next();
}

// Connect to MongoDB
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/post-site-db');
}

// Setting static files
app.use("/public", express.static(__dirname + '/public'))

// Setting view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logger);

// Models

// Routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({});
    res.render('index', {photos: photos});
})

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/add-post", (req, res) => {
    res.render('add_post');
});

app.post("/store-post", async (req, res) => {
    await Photo.create(req.body);
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server started at port ${port} ...`);
});