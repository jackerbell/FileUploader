const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/images',express.static('images')); // 방문자가 직접 images 폴더에 접근할 수 있게 되어 브라우저에서 이미지를 볼수 있게됨.
                                            // /images 라는 경로를 제거해줌.
app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
