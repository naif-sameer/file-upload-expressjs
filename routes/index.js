const { Router } = require('express');
const multer = require('multer');
const path = require('path');

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
  fileFilter: (req, file, cb) => {
    console.log('file from filter', file);
    cb(false)
  },
  // dest: path.join(__dirname, 'public', 'upload'),
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

router.post('/add_user', userFilesHandler, (req, res) => {
  console.log(JSON.stringify(req.body));
  res.send('hi');
});

module.exports = router;
