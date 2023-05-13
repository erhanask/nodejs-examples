const Photo = require('../models/Photos');
const fs = require('fs');

exports.getAllPosts = async (req, res) => {
    const photos = await Photo.find({});
    res.render('index', {photos: photos});
};

exports.getPost = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('video-page', {photo: photo});
};

exports.createPost = async (req, res) => {
    let uploadedPhoto = req.files.photo;
    let uploadPath = __dirname + '/../public/uploads/' + uploadedPhoto.name;
    console.log(uploadPath);
    await uploadedPhoto.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/public/uploads/' + uploadedPhoto.name,
        });
    });

    res.redirect('/');
};

exports.updatePost = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect('/post/' + req.params.id);
};

exports.deletePost = async (req, res) => {
    const photo = await Photo.findById(req.body.id);
    const photoPath = __dirname + photo.image;

    if (fs.existsSync(photoPath))
        fs.unlinkSync(photoPath);

    await photo.deleteOne(photo);
    res.redirect('/');
};

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPage = (req, res) => {
    res.render('add_post');
};

exports.getEditPage = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit_post', {photo: photo});
}


