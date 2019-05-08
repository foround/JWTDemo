const express = require('express');
const moment = require('moment');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser')

const app = express()

const generateList = require('./data/list')
app.set('jwtTokenSecret','p0by5lqpj9gpu6cnoxg1b')
app.use(bodyParser.urlencoded({extended: false}))

const defaultDuration = moment.duration(2,'hours')
function isValidUser(username,password){
    return username === 'zhengxu' && password === '123456'
}

app.post('/login',function(req,res,next){
    let {username,password} = req.body;
    if(!isValidUser(username,password)){
        next(new Error('Invilid username or password'))
    }else{
        next()

    }
})
app.post('/login',function(req,res,next){
    let expires = moment().add(defaultDuration).valueOf();
    console.log(expires)
    let {username} = req.body;
    let token = jwt.encode({
        iss: username,
        exp: expires
    },app.get('jwtTokenSecret'))
    res.setHeader('Content-Type','application/json');
    res.json({
        token,
        expires: expires,
        user: 'zhengxu'
    })
})

app.use(/\/(?!login$).*/,function(req,res,next){
    let {token} = req.body;
    if(!token) throw new Error('未携带token，非法登陆');

    let decodedToken = jwt.decode(token,app.get("jwtTokenSecret"));
    let {iss,exp} = decodedToken;
    if(iss != 'zhengxu') throw new Error('用户id非法');
    if(moment().diff(exp) > 0) throw new Error('token已过期');
    next()

})
app.get('/list',function(req,res){
    let list = generateList()
    res.setHeader('Content-Type','application/json');
    res.json({...list,timeStamp: moment().valueOf()})
})
app.use(function(err,req,res,next){
    res.setHeader('Content-Type','application/json');
    res.json({errMsg: err.message})

})
app.listen(3000,function(){
    console.log('server listen on 3000')
})