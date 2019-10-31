const url = require('url');
const fs = require('fs');
const moment = require('moment')
const path = require('path');
const express = require('express');
const multer = require('multer');

let app = express()
let router = express.Router()


let time = moment().format('YYYY-MM-DD')
let upload = multer({ dest: 'static/upload/' + time })

router.get('/api', (req, res) => {
    console.log('laile')
    res.end('666')
})
router.get('/err', (req, res, next) => {
    let errPath = './666.txt'
    console.log(req.path)
    try {
        let txt = fs.readFileSync(errPath)
    } catch (err){
        next(err)
    }
})

router.post('/upload', upload.array('file', 12), (req, res) => {
    console.log(req.body, req.files);
    console.dir(req.body.avatar);
    let files = req.files;
    let data = []
    for (let i = 0; i < files.length; i++) {
        console.log(files[i].path.split('\\').slice(1).join('/'))
        let temp = {path: files[i].path.split('\\').slice(1).join('/'), type: files[i].mimetype, name: files[i].originalname};
        data.push(temp)
    }
    res.json({status: 1, data})
})

app.use('/', express.static('./static'))

router.all('*', (req, res) => {
    res.send('亲页面不存在')
})
app.use((req, res, next) => {
    console.log(req.method)
    next()
})
app.use(router)
app.use((err, req, res, next) => {
    res.send('<h1>666 哎呦网络丢了</h1>')
})

app.listen(80, () => {
    console.log('服务器已启动: 点击 http://127.0.0.1 访问')
})
