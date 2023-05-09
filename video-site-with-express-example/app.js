const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const port = 3000;
const app = express();
const uploadDir = 'public/uploads';
const Photo = require('./models/Photos');
const fs = require('fs');

const logger = (req, res, next) => {
    // Every time a request is made, this middleware will be called
    // console.log('visited');
    next();
}

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
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
app.use(fileUpload());

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
    let uploadedPhoto = req.files.photo;
    let uploadPath = __dirname + '/public/uploads/' + uploadedPhoto.name;

    uploadedPhoto.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/public/uploads/' + uploadedPhoto.name,
        });
    });

    res.redirect('/');
});

app.get("/post/:id", async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('video-page', {photo: photo});
});


app.listen(port, () => {
    console.log(`Server started at port ${port} ...`);
});