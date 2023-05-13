const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const port = 3000;
const app = express();
const uploadDir = 'public/uploads';
const Photo = require('./models/Photos');
const fs = require('fs');
const photoController = require('./controllers/photoController');


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
app.get('/', photoController.getAllPosts);

app.get("/about", photoController.getAboutPage);

app.get("/add-post", photoController.getAddPage);

app.get("/edit-post/:id", photoController.getEditPage);

app.post("/update-post/:id", photoController.updatePost);

app.post("/delete-post", photoController.deletePost);

app.post("/store-post", photoController.createPost);

app.get("/post/:id", photoController.getPost);


app.listen(port, () => {
    console.log(`Server started at port ${port} ...`);
});