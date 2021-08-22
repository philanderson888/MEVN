# login-02

## contents

- [login-02](#login-02)
  - [contents](#contents)
  - [introduction](#introduction)
  - [run the database and the back end again](#run-the-database-and-the-back-end-again)
  - [getting started with the front end vuejs application](#getting-started-with-the-front-end-vuejs-application)
  - [strip out unwanted stuff from the default boilerplate code](#strip-out-unwanted-stuff-from-the-default-boilerplate-code)


## introduction

this app is `login-02` which builds the front end onto the back end built in `login-01`

to keep a version of `login-01` intact and untouched, just go to `File Explorer` in Windows and `copy` `login-01` as `login-02` and so create a clone of everything built so far.

We can then start moving forwards again

```
mevn/projects/login/
                   /login-01          // back end
                   /login-02          // copy of /login-01 containing the back end, we will build on this and add the front end
```

## run the database and the back end again

to prove we have just cloned the folder correctly, let's run our mongo database again and our back end app 

hit `control-'` to open a terminal and type

```js
mongod
```
hit `+` to create a new terminal, navigate to the `/mevn/projects/login/login-02/api` folder and type

```js
cd mevn/projects/login/login-02/api
nodemon
/*
PS C:\github> cd .\mevn\projects\login\login-02\api 
PS C:\github\mevn\projects\login\login-02\api> nodemon
[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./bin/www`
starting app and keeping it running with 'nodemon'
```

go to `http://localhost:3000` to observe our default home page

to prove it's working we can edit the home page `routes\index.js`

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express By Phil Anderson' });
});

module.exports = router;
```

and the `/views/index.jade` view

```jade
extends layout

block content
  h1= title
  p Welcome to #{title} building a VueJS application with MongoDB, Express and NodeJS using authentication with PassportJS and JWT Json Web Tokens
```

and now the output looks like, on our `http://localhost:3000` page

```
Express By Phil Anderson
Welcome to Express By Phil Anderson building a VueJS application with MongoDB, Express and NodeJS using authentication with PassportJS and JWT Json Web Tokens
```

so we are ready to build the front end to talk to this back end now

## getting started with the front end vuejs application

to build out a vuejs application we have `boilerplate` starter code built for us by the vue3 engine which can be run by typing the following in an administrator prompt

```js
// navigate to root folder for front end application
cd mevn/projects/login/login-02/app
// install the vue client
yarn global add @vue/cli
// upgrade
yarn global upgrade --latest@vue/cli 
// check the version
vue --version
/*
@vue/cli 4.5.13
*/
```

to scaffold the vue app we now type

```js
vue create . // yes in current folder, manually select, Vue version (3), babel, typescript, router, linter.  Answer 'y' to all the questions, choose linter with errors only, lint on save, in package.json, and don't save this for future use!
// add axios library for making http calls to our mongo database
yarn add axios
// run the application
yarn serve
```

go to `http://localhost:8080` to see your vue application running.

## strip out unwanted stuff from the default boilerplate code

to get started we strip out unwanted material from the vue js starter code

(( remember now that if you have too many powershell windows open, just close them all and open up fresh terminal instances in VScode which can be easily shown and hidden using `VSCode` `Control '` control with single apostrophe mark. ))

strip out the image from `Home.vue`

```js
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
```

strip out all the material inside the `<template> </template>` tags

```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
```

and change the hello message in `Home.vue`

```js
<HelloWorld msg="VueJS app using Mongo database with JWT authentication"/>
```

you should now see your app running at port `http://localhost:8080` as well as your back end running at port `http://localhost:3000` so we are poised now to build out our front end application




