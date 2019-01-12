let express = require('express');

let bodyParser = require('body-parser')

let LostAndFound = require('./db')

let app = express();

app.use(bodyParser.json())

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

app.post('/registe', function (req, res) {
    let userinfo = req.body;
    let name = req.body.registeUsername;
    let password = req.body.registePassword;
    LostAndFound.findOne({ registeUsername: name, registePassword: password }, function (err, docs) {
        res.json(docs)
    })
    LostAndFound.create(userinfo).then(() => {
    })
})

app.post('/submit', function (req, res) {
    console.log(req.body);
    let body = req.body;
    LostAndFound.create(body, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log(docs);
        }
    })
})

app.get('/content', function (req, res) {
    LostAndFound.find({ kind: { $in: ['lost', 'found'] } }, function (err, docs) {
        console.log(docs)
        res.json(docs);
    })
})

app.get('/lostContent', function (req, res) {
    LostAndFound.find({ kind: 'lost' }, function (err, docs) {
        console.log(docs)
        res.json(docs);
    })
})

app.get('/foundContent', function (req, res) {
    LostAndFound.find({ kind: 'found' }, function (err, docs) {
        console.log(docs);
        res.json(docs);
    })
})


app.post('/login', function (req, res) {
    console.log(req.body.loginUsername)
    console.log(req.body.loginPassword)//打印前端传过来的登陆信息
    let loginUsername = req.body.loginUsername;
    let loginPassword = req.body.loginPassword;
    LostAndFound.findOne({ registeUsername: loginUsername, registePassword: loginPassword }, function (err, docs) {//查找数据库 看数据库中的注册信息是否包含登陆信息
        console.log(docs);
        res.json(docs);
    })
})


app.listen(3000, function () {
    console.log('服务器正在监听3000端口！')
})