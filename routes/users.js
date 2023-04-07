const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const storageConfig = multer.diskStorage({ // 서버측에서 클라이언트에서 전송한 파일을 어떻게 저장할지에 대해 처리
  destination: (req,file,cb) => {
    cb(null,'images'); // 저장될 파일 경로
  },
  filename: (req,file,cb)=>{
    cb(null,Date.now() + '-' + file.originalname,); // Date객체의 now메서드는 동일한 파일을 저장할 경우 구분할 수 있는 유일한 값을 부여하기 위해서
  }
});

const upload = multer({ storage: storageConfig});
const router = express.Router();

router.get('/', async function(req, res) { // add 처리 이후 메인페이지에서 전환되므로 여기에 데이터베이스에서 가져온 데이터를 이용해 이미지를 띄움
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles',{users:users});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles',upload.single('image'),async (req,res)=>{
  const uploadedImageFile = req.file;
  const userData = req.body;

  // console.log(uploadedImageFile);
  // console.log(userData);
  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path
  })

  res.redirect('/');
})

module.exports = router;