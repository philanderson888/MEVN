## mevn-04

## contents

- [mevn-04](#mevn-04)
- [contents](#contents)
- [introduction](#introduction)
- [getting started](#getting-started)
- [tidy up](#tidy-up)
- [install bootstrap](#install-bootstrap)
- [component](#component)
- [install axios](#install-axios)
- [new component to create items in our database](#new-component-to-create-items-in-our-database)
- [initialise back end api libraries](#initialise-back-end-api-libraries)
- [install mongodb](#install-mongodb)
- [start mongo database](#start-mongo-database)
- [install mongo shell command line program (optional)](#install-mongo-shell-command-line-program-optional)
- [add mongo to our application](#add-mongo-to-our-application)
- [add `model` database file](#add-model-database-file)
- [add backend api http `routes` file `api\routes\student.route.js`](#add-backend-api-http-routes-file-apiroutesstudentroutejs)
- [start the database](#start-the-database)
- [start the back end api](#start-the-back-end-api)

## introduction

so far we have 

- created a vue3 app from scratch
- added our first component
- added our first view which uses this component
- created a route to link to this view
- displayed the view in the app
- added bootstrap
- added a navbar menu in bootstrap

we are now going to add axios to talk to a database and read in data continuing [this tutorial](https://www.positronx.io/vue-mevn-stack-tutorial-build-full-stack-vue-js-crud-app)

## getting started

run this command to create the app

```js
vue create mevn-04; cd mevn-04; yarn serve
```

choose these vue install options

```
version, babel, typescript, router, linter
questions answer - vue 3, yes, yes, yes, linter with error, lint on save, package.json, no
```

view the app at http://localhost:8080

## tidy up

remove `assets\logo.png`

`HelloWorld.vue`

```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>
```

`Home.vue`

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

check the app is still running ok with no errors

## install bootstrap

stop the app running with `control-c` and install bootstrap 

```js
yarn add bootstrap; yarn serve
```

`main.ts`

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
createApp(App).use(router).mount('#app')
```

## component 

add our first component into the app

`components\ListComponent.vue`

```js
<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class ListComponent extends Vue {
  msg!: string;
  data() {
    return {
      
    }
  }
}
</script>
```

`views\ListView.vue`

```js
<template>
  <div>
    <ListComponent msg="This page lists database items"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListComponent from '@/components/ListComponent.vue'; // @ is an alias to /src

@Options({
  components: {
    ListComponent,
  },
})
export default class ListView extends Vue {}
</script>
```

`router\index.ts`

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const routes: Array<RouteRecordRaw> = [
  {  path: '/',      name: 'Home',  component: Home   },
  {  path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')  },
  {  path: '/list',  name: 'List',  component: () => import(/* webpackChunkName: "list" */ '../views/ListView.vue')  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
```

`App.vue` with bootstrap navbar

```js
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
    <div class="container">
      <router-link class="nav-link pr-3" to="/">
        <a class="navbar-brand float-left">MEVN Stack Example</a>
      </router-link>
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list">View Students</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<style>
.nav-item {
  padding: 0 1vw;
}
</style>
```

we now have our working app but no database; next step is to hook in the database

## install axios

```js
yarn add axios; yarn serve
```

## new component to create items in our database

let's now create a new component which will add items into our database

`components\CreateComponent.vue`

```js
<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">{{msg}}</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="student.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="student.email" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="student.phone" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block form-control">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  props: {
    msg: String
  }
})
export default class CreateComponent extends Vue {
  msg!: string;

  data() {
    return {
        student: {
            name: '',
            email: '',
            phone: ''
        } 
    }
  }

  handleSubmitForm() { 
      //alert (`form is being submitted`)
      return true
  }

}
</script>
```

`views\CreateView.vue`

```js
<template>
  <div>
    <CreateComponent msg="Create Student"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CreateComponent from '@/components/CreateComponent.vue'; 

@Options({
  components: {
    CreateComponent,
  },
})
export default class CreateView extends Vue {}
</script>
```

`router\index.ts`

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const routes: Array<RouteRecordRaw> = [
  {  path: '/',      name: 'Home',  component: Home   },
  {  path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')  },
  {  path: '/list',  name: 'List',  component: () => import(/* webpackChunkName: "list" */ '../views/ListView.vue')  },
  {  path: '/create',name: 'Create',component: () => import(/* webpackChunkName: "create" */ '../views/CreateView.vue')  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
```

`App.vue` with a little extra styling

```js
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
    <div class="container">
      <router-link class="nav-link pr-3" to="/">
        <a class="navbar-brand float-left">MEVN Stack Example</a>
      </router-link>
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list">View Students</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/create">Add New Student</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<style>
.nav-item {
  padding: 0 1vw;
}
.form-group{
  padding: 1vh 0;
}
</style>
```

check for errors and fix any that are present.

to test our form out we can complete all the details and press `submit`.  the method defined should trigger an alert that the form is being submitted.

## initialise back end api libraries

we can now start to build out the back end of our api which will hold our database and data

in the root of our project create `api` folder

```powershell
md api; cd api
npm init # accept all defaults by pressing 'enter'
yarn add body-parser cors express mongoose
```

from an administrator prompt install `nodemon` which monitors our code for changes and automatically restarts our application

```powershell
yarn global add nodemon
```

## install mongodb

as administrator run the following on Windows

```powershell
choco install mongodb
```

to add `mongo` to the windows `path` press the `windows` key, type `env` and choose to `edit the environment variables` and in the system section, find `path` and click `edit`.  click `new` to add a new path and paste in `C:\Program Files\MongoDB\Server\5.0\bin` which is where you will find the mongo executables installed.  save and reboot your computer to activate the environment variables.

notice the path to the database and log files

```
C:\ProgramData\MongoDB\data\db
C:\ProgramData\MongoDB\log
```

these paths are where the data will be stored.  

## start mongo database

to start mongo database running type

```powershell
mongo
```

## install mongo shell command line program (optional)

in addition, download and install the mongo shell command line program, `mongosh` from https://www.mongodb.com/try/download/shell?jmp=docs then add this to your `path` variables `C:\Program Files\mongosh` and restart Windows.

after restarting windows you can now talk to your database.

firstly start your database as above then run the mongo client which has been updated to `mongosh`

```powershell
# start database
mongod
# start mongo client which can talk to the database
mongosh
```

## add mongo to our application

add new file `api\database.js` 

```js
module.exports = {
   db: 'mongodb://localhost:27017/vuecrudmevn'
}
```

## add `model` database file

in the database we need to specify the structure of data we are going to store.  This structure is called a `model` and we create it at `api\models\Student.js`

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
}, {
  collection: 'students'
})
module.exports = mongoose.model('Student', studentSchema)
```

## add backend api http `routes` file `api\routes\student.route.js` 

we next add a file to deal with different `http requests` which are `get`, `post`, `put` and `delete` which perform the 4 crud operations. Let's add `api\routes\student.route.js` file

```js
const express = require('express');
const studentRoute = express.Router();

// model
let StudentModel = require('../models/Student');

studentRoute.route('/create-student').post((req, res, next) => {
  StudentModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
});

studentRoute.route('/').get((req, res, next) => {
    StudentModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

studentRoute.route('/edit-student/:id').get((req, res, next) => {
   StudentModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
studentRoute.route('/update-student/:id').post((req, res, next) => {
  StudentModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

// Delete
studentRoute.route('/delete-student/:id').delete((req, res, next) => {
  StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = studentRoute;
```

and the master backend `api\app.js` file

```js
let express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  database = require('./database'),
  bodyParser = require('body-parser');

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

const studentAPI = require('../api/routes/student.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// API
app.use('/api', studentAPI)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
```

and register this file in `package.json`

```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.13.7",
    "nodemon": "^2.0.12"
  }
}
```

## start the database

start the database running with `mongo` command 

## start the back end api 

start the back end api running by navigating to the `api` folder and running

```javascript
nodemon
```

this should now say that the api is running at `http://localhost:4000/api` which can be tested



