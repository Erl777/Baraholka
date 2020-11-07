// https://metanit.com/web/nodejs/4.11.php
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
const crypto = require('crypto');

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static("../" + __dirname + "/public")); // ??????

// рандомная генерация строки (токена)
function generateToken(){
    return crypto.randomBytes(10).toString('hex')
}


// Избавился от CORS политики
app.use(function (req, res, next) {
    var origins = [
        'http://localhost:8080',
        'http://localhost:3000',
    ];

    for(var i = 0; i < origins.length; i++){
        var origin = origins[i];

        if(req.headers.origin.indexOf(origin) > -1){
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
    }

    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// получение списка постов
app.get("/api/posts", function(req, res){

    var content = fs.readFileSync("posts.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});

// получение одного пользователя по id
app.get("/api/post/:id", function(req, res){

    var id = req.params.id; // получаем id
    // console.log(id);
    var content = fs.readFileSync("posts.json", "utf8");
    var posts = JSON.parse(content);
    var post = null;
    // находим в массиве пользователя по id
    for(var i=0; i<posts.length; i++){
        if(posts[i].postId==id){
            post = posts[i];
            break;
        }
    }
    // отправляем пользователя
    if(post){
        res.send(post);
    }
    else{
        res.status(404).send();
    }
});

// изменение поста (деактивация)
app.put("/api/posts/deactivate", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    var userId = req.body.id;
    var active = req.body.active;

    var data = fs.readFileSync("posts.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].postId==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.active = active;
        var data = JSON.stringify(users);
        fs.writeFileSync("posts.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

// изменение поста (активация)
app.put("/api/posts/activate", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    var userId = req.body.id;
    var active = req.body.active;

    var data = fs.readFileSync("posts.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].postId==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.active = active;
        var data = JSON.stringify(users);
        fs.writeFileSync("posts.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

// изменение поста (добавление просмотра объявлению)
app.put("/api/posts/view", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    var userId = req.body.id;

    var data = fs.readFileSync("posts.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].postId==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.views = parseInt(user.views) + 1 ;
        var data = JSON.stringify(users);
        fs.writeFileSync("posts.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

// получение отправленных данных ( добавление объявления )
app.post("/api/posts/add", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var rubric = req.body.rubric;
    // var postId = req.body.postId;
    var postName = req.body.title;
    var price = req.body.price;
    var description = req.body.description;
    var author = req.body.author;
    var created = req.body.created;
    var views = req.body.views;
    var active = req.body.active;
    var firstPhoneNumber = req.body.firstPhoneNumber;
    var secondPhoneNumber = req.body.secondPhoneNumber;

    var images = JSON.parse(req.body.loadedImages);
    var imagesUrls = [];
    for(var i = 0; i < images.length; i++){
        imagesUrls.push(images[i].name);
    }

    var post = {
        title: postName,
        price: price,
        img: imagesUrls,
        description: description,
        author: author,
        views: views,
        rubric: rubric,
        created: created,
        active: active,
        firstPhoneNumber: firstPhoneNumber,
        secondPhoneNumber: secondPhoneNumber
    };

    var data = fs.readFileSync("posts.json", "utf8");
    var posts = JSON.parse(data);

    // находим максимальный id
    var id = Math.max.apply(Math,posts.map(function(o){return o.postId;}))
    // увеличиваем его на единицу
    post.postId = id+1;
    // добавляем пользователя в массив
    posts.push(post);
    var data = JSON.stringify(posts);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("posts.json", data);
    res.send(post);
});

// удаление поста по posId
app.delete("/api/posts/del/:id", function(req, res){

    var id = req.params.id;
    var data = fs.readFileSync("posts.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i<users.length; i++){
        if(users[i].postId==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("posts.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

// изменение поста
app.put("/api/posts/edit", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    var id = req.body.postId;
    var title = req.body.title;
    var price = req.body.price;
    var rubric = req.body.rubric;
    var description = req.body.description;
    var img = req.body.img;
    var firstPhoneNumber = req.body.firstPhoneNumber;
    var secondPhoneNumber = req.body.secondPhoneNumber;

    var data = fs.readFileSync("posts.json", "utf8");
    var posts = JSON.parse(data);
    var post;
    for(var i=0; i<posts.length; i++){
        if(posts[i].postId==id){
            post = posts[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(post){
        if(title !== undefined) post.title = title;
        if(price !== undefined) post.price = price;
        if(rubric !== undefined) post.rubric = rubric;
        if(description !== undefined) post.description = description;
        if(img !== null) post.img = img;
        if(firstPhoneNumber !== undefined) post.firstPhoneNumber = firstPhoneNumber;
        if(secondPhoneNumber !== undefined) post.secondPhoneNumber = secondPhoneNumber;
        var data = JSON.stringify(posts);
        fs.writeFileSync("posts.json", data);
        res.send(post);
    }
    else{
        res.status(404).send(post);
    }
});

// получение одного пользователя по id *
app.get("/api/users/:id", function(req, res){

    var id = req.params.id; // получаем id
    // console.log(id);
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

// получение одного пользователя по token *
app.get("/api/users/token/:token", function(req, res){

    var token = req.params.token; // получаем token
    // console.log(token);
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].token==token){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

// получение отправленных данных ( добавление пользователя ) *
app.post("/api/users/add", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userId = req.body.email;
    var password = req.body.password;
    var token = generateToken();
    var user = {
        name: userName,
        id: userId,
        token: token,
        password: password
    };

    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);

    // находим максимальный id
    // var id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    // user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    var data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
});
// удаление пользователя по id
app.delete("/api/users/:id", function(req, res){

    var id = req.params.id;
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/api/users", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    var userId = req.body.id;
    var userName = req.body.name;
    var userAge = req.body.age;

    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.age = userAge;
        user.name = userName;
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

// изменение данных пользователя *
app.put("/api/users/edit", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userEmail = req.body.email;
    var userNewPass = req.body.newPass;
    var userId = req.body.userId;

    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        if(userName !== undefined) user.name = userName;
        if(userEmail !== undefined) user.id = userEmail;
        if(userNewPass !== undefined) user.password = userNewPass;

        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});