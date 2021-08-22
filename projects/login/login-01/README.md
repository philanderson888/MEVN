# login-01

## contents

- [login-01](#login-01)
  - [contents](#contents)
  - [introduction](#introduction)
  - [tutorial](#tutorial)
  - [getting started](#getting-started)
  - [install the latest version of node and npm](#install-the-latest-version-of-node-and-npm)
  - [getting started with the back end `/api` folder](#getting-started-with-the-back-end-api-folder)
  - [nodemon](#nodemon)
  - [install mongo database](#install-mongo-database)
  - [add mongo database to 'path'](#add-mongo-database-to-path)
  - [install mongo shell command line program](#install-mongo-shell-command-line-program)
  - [running multiple shells](#running-multiple-shells)
  - [get started building our back end 'database' files](#get-started-building-our-back-end-database-files)

## introduction

this app aims to create a MEVN stack application which uses Mongo database for the back end data.  It uses VueJS to build the front end to read the data, expressJS to provide the middleware authentication and nodeJS to build out the application.  This application will use passportJS to provide authentication of users using JSON web token, with secure authentication.

## tutorial

the tutorial i am following is https://thewebdev.info/2020/09/29/create-a-full-stack-web-app-with-the-mevn-stack/ with the final code at https://bitbucket.org/hauyeung/mevn-example/src/master/.  However I will be going into full detail at every step and providing several versions along the way, for ease of being clear on what is happening at every stage.  Also this tutorial was written and last updated in September 2020 which is about 11 months ago at the time of writing, August 2021, so if there are any tweaks to the code or libraries, you will find them here.

## getting started 

create a root folder for your work, for example on my system i have the backend data in `/api` folder and the front end work in `/app` folder.  I will be incrementing the versions of the `login-01`, `login-02` etc as I build out complexity in the app stage by stage so the version `login-01` will be the simplest and the last number will be the completed app.  This will help those beginners who are following not to get lost in the complexity if there is too big a jump from the start to the finish, I will be providing way-points along the way which will be easier to follow for some people.  for others who are more advanced, you can maybe jump straight to the last version of the app.

```
/mevn/projects/login/login-01/       // incrementing version numbers increasing in complexity
                             /api    // back end
                             /app    // front end
```

let's just ensure we have the latest versions of our tools installed

note that i am building on a windows system so linux and mac users may need to tweak this tutorial a bit.  if you do follow this tutorial and build it on linux or mac, be sure to let me know and I will add a link to your work so that others can follow also.

## install the latest version of node and npm

simply go to https://nodejs.org/en/ and download the latest version, and include `chocolatey` as part of the install when asked.  `chocolatey` is a great command line tool for downloading and installing applications without the gui

## getting started with the back end `/api` folder

run a `powershell` session as administrator, create then navigate to your root folder eg `/mevn/projects/login/login-01/api` folder 

```
md mevn
cd mevn
md projects
cd projects
md login
cd login
md login-01
cd login-01
md api
cd api
```

now install yarn and npx and build our template application, and add libraries to it

```js
// clear the npm cache before starting work 
npm cache clean -f
// install latest version of npm
npm install -g npm@latest 
// install yarn
npm install -g yarn
// install npx
yarn add global npx
// use npx to install express-generator
npx express-generator
// install libraries (pug is latest form of jade)
yarn add cors mongoose jsonwebtokenm pug bcrypt
```

to test it's all working type

```
ls
```

and you will see `app.js` as a file

in the file, after `var app = express();` type another line

```js
console.log('starting app')
```

then in your `powershell` type

```js
node app.js
```

and the output should show `starting app`

```
PS C:\github\mevn\projects\login\login-01\api> node app.js
starting app
```

we are ready to get started!

## nodemon

nodemon will automatically restart your back end after any changes are made

in your `powershell` administrator shell type

```js
yarn global add nodemon
nodemon
/* 
starting app
*/
```
the app is now running, and any changes you make will be automatically started.  Try altering the text of the `console.log` and you will see.

```js
console.log(`starting app and keeping it running with 'nodemon'`)
/* 
PS C:\github\mevn\projects\login\login-01\api> nodemon
[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./bin/www`
starting app
[nodemon] restarting due to changes...
^C[nodemon] starting `node ./bin/www`
starting app and keeping it running with 'nodemon'
*/
```

## install mongo database

if we installed `nodejs` properly as instructed above we also installed `chocolatey` which allows us to install applications with the minimum of fuss from the command line.  We can use this to install `mongodb`

use an administrator prompt (leave the `nodemon` running and start a new command line shell) and type

```js
choco install mongodb
```

## add mongo database to 'path'

to allow windows to find our mongo install files whenever we just type `mongo` or `mongod` we must first add the path to our mongo installation to the 'path' environmental variable in windows

to add `mongo` to the windows `path` press the `windows` key, type `env` and choose to `edit the environment variables` and in the system section, find `path` and click `edit`.  click `new` to add a new path and paste in `C:\Program Files\MongoDB\Server\5.0\bin` which is where you will find the mongo executables installed.  save and reboot your computer to activate the environment variables.

notice the path to the database and log files

```
C:\ProgramData\MongoDB\data\db
C:\ProgramData\MongoDB\log
```

these paths are where the data will be stored.  

after your reboot type 

```js
mongo
```
Hit `Control-C` to exit the mongo shell

## install mongo shell command line program 

in addition, download and install the mongo shell command line program, `mongosh` from https://www.mongodb.com/try/download/shell?jmp=docs then add this to your `path` variables `C:\Program Files\mongosh` and restart Windows.

after restarting windows you can now talk to your database.

firstly start your database as above then run the mongo client which has been updated to `mongosh`

```powershell
# start database
mongod
# start mongo client which can talk to the database
mongosh
```

## running multiple shells

you will notice that we have our `nodemon` running in one shell, also `mongod` which runs the mongo database and `mongo` or `mongosh` which can talk to the database.  When we are running multiple windows, VSCode is ideal as it can run and hide shells but still keep them running in the background.

Just close all your `powershell` shells and go to `VSCode` and type `Control '` which is control key plus single apostrophe key.  This will open up the `terminal` shell and we can open up multiple shells by hitting the '+' (plus) button and choosing `powershell`.  We can easily switch between shells by clicking `pwsh` on the right 

Type `control '` to open a shell then navigate to your `/api` folder and type

```js
nodemon
/*
starting app and keeping it running with 'nodemon'
*/
```
Hit the '+' button to open a new shell and type

```js
mongod
```
to start our mongo database running

this is all we will need for now and we can get back to building our back-end application

((note that to hide our terminal in vscode while building out other code, just hit `control-'` to show or hide the terminal))

## get started building our back end 'database' files

to get started in our back end `/api` folder add a new file `db.js`

```js
const { Schema, createConnection } = require('mongoose');
const connection = createConnection('mongodb://localhost:27017/mevn-example', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
  name: String,
  password: String
});

const User = connection.model('User', userSchema);

const todoSchema = new Schema({
  name: String,
  done: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = connection.model('Todo', todoSchema);

module.exports = {
  User,
  Todo
}
```

also create `constants.js`

```js
module.exports = {
  SECRET: 'secret'
}
```

also `routes\todos.js`

```js
var express = require('express');
var router = express.Router();
const { Todo } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

const verifyToken = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization, SECRET);
    return next();
  } catch (err) {
    console.log(err)
    return res.status(401);
  }
}

router.get('/', verifyToken, async (req, res) => {
  const { _id } = req.user;
  const todos = await Todo.find({ user: _id })
  res.json(todos);
});

router.get('/:id', verifyToken, async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id, user: _id })
  res.json(todo);
});

router.post('/', verifyToken, async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  const todo = new Todo({ name, done: false, user: _id })
  await todo.save()
  res.json(todo);
});

router.put('/:id', verifyToken, async (req, res) => {
  const { name, done } = req.body;
  const { id } = req.params;
  const todo = await Todo.findOneAndUpdate({ _id: id }, { name, done })
  await todo.save();
  res.json(todo);
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await Todo.deleteOne({ _id: id })
  res.status(200).send();
});

module.exports = router;
```

and replace `\routes\users.js` with

```js
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db');
const { SECRET } = require('../constants');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return res.json({ err: 'user already exists' }).status(401);
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    password: hashedPassword
  })
  await user.save();
  res.json(user).status(201);
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const { _id, password: userPassword } = await User.findOne({ name });
  const match = await bcrypt.compare(password, userPassword);
  if (match) {
    const token = await jwt.sign({ name, _id }, SECRET);
    return res.json({ token });
  }
  res.status(401);
});

module.exports = router;
```

and finally replace `app.js` with

```js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var defaultrouter = require('./routes/index.js')
var todorouter = require('./routes/todos');
var usersRouter = require('./routes/users');

var app = express();

console.log(`starting app and keeping it running with 'nodemon'`)

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',defaultrouter);
app.use('/todos', todorouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

if you have done everything correctly you can now open two shells in `VSCode` and one of them have the mongo database running

```js
mongod
```
and in the other have the back end database application running

```js
nodemon
/*
PS C:\github\mevn\projects\login\login-01\api> nodemon        
[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./bin/www`
starting app and keeping it running with 'nodemon'
(node:12392) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in 
a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
*/
```

you can see if your back end application is running at `http://localhost:3000` and you should get the response `Express - Welcome to Express` back in your browser.

to get back any data we will need to build our front end as we have built this as a secure application so with any request to `get` or `post` data we will need to provide a `JSON Web Token` which we cannot do manually (easily!)

you will see both of the routes are working though by typing, in your browser, `http://localhost:3000/todos` or `http://localhost:3000/users` and observing the results in the terminal running `nodemon` - the output should say

```
GET / 200 393.185 ms - 170
GET /stylesheets/style.css 304 3.177 ms - -
{ JsonWebTokenError: jwt must be provided
 name: 'JsonWebTokenError', message: 'jwt must be provided' }
```

So let's get building version 2 of the app with a front end

