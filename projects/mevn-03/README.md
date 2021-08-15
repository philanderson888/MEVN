# mevn-03

## contents

- [mevn-03](#mevn-03)
  - [contents](#contents)
  - [introduction](#introduction)
  - [instalation](#instalation)
  - [add bootstrap](#add-bootstrap)
  - [add first component](#add-first-component)

## introduction

this next stage adds in full bootstrap dependencies and builds a bootstrap menu navbar

in the previous stage we have

- created the basic app
- added routing
- created a fresh component
- created a fresh view using this component
- added the view to the router with a path 
- displayed this view on the main application page

## instalation

let's install the app again from scratch, using the following command

```js
vue create mevn-03; cd mevn-03; yarn serve
```

vue install settings

```
version, babel, typescript, router, linter
questions answer - vue 3, yes, yes, yes, linter with error, lint on save, package.json, no
```

you should now be able to view the app at http://localhost:8080

as before perform the following tidy up steps

remove `src\assets\logo.png`

strip back `HelloWorld.vue` 

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

strip out the reference to the logo in `Home.vue`

```js
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>
```

check the app is still running and there are no errors

## add bootstrap

as I said bootstrap is completely not necessary but the tutorial uses it so let's install it

stop the app running (control-c) and then run 

```js
yarn add bootstrap
yarn serve
```

`main.ts`

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
createApp(App).use(router).mount('#app')
```
you can now see bootstrap at work by adding in `//` in front of the `import bootstrap..` line above and viewing the changes shown on the running app

## add first component

let's not disturb the app for now and add in our first component which we will call `ListComponent` and be viewable in our `ListView` view

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
    <ListComponent msg="Welcome to Your Vue.js + TypeScript App"/>
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
export default class Home extends Vue {}
</script>
```

now let's connect in this page via the router to give it a path in our application

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

now finally add this into `App.vue` to make it visible

```js
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/list">List Items</router-link>
  </div>
  <router-view/>
</template>
```
we can now swap in the bootstrap styling 

```js
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
    <div class="container">
      <a class="navbar-brand float-left">MEVN Stack Example</a>
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