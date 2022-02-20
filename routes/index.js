const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const User = require('./../models/user');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload');
  },
  filename: (req, file, cb) => {
    const randomNumber = Math.round(Math.random() * 1e9);
    const uniqueSuffix = `${Date.now()}-${randomNumber}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  fileFilter: (req, { fieldname, mimetype, originalname }, cb) => {
    const isProfile =
      fieldname == 'profile_picture' && mimetype == 'image/jpeg';
    const isCV = fieldname == 'cv_file' && mimetype == 'application/pdf';

    if (isProfile) cb(null, true);
    else if (isCV) cb(null, true);
    else cb(new Error(`Sorry 😩 The type of ${originalname} not support.`), false);
  },
  storage,
});

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'File upload form 😉',
  });
});

const userFilesHandler = upload.fields([
  {
    name: 'profile_picture',
    maxCount: 1,
  },
  {
    name: 'cv_file',
    maxCount: 1,
  },
]);

router.post('/add_user', userFilesHandler, async (req, res) => {
  try {
    const { full_name, username, email } = req.body;
    const { profile_picture, cv_file } = req.files;

    await User.insertMany({
      full_name,
      username,
      email,
      profile_picture: profile_picture[0].path,
      cv_file: cv_file[0].path,
    });

    res.send('hi');
  } catch (err) {
    console.log(err.writeErrors);
    res.json(err.writeErrors[0].errmsg);
  }
});

module.exports = router;
