# MEVN

A repository for learning the MEVN stack

## Contents
- [MEVN](#mevn)
  - [Contents](#contents)
  - [Introduction](#introduction)
  - [installation](#installation)
  - [create our first mevn stack application](#create-our-first-mevn-stack-application)
- [create a mevn stack application with authentication](#create-a-mevn-stack-application-with-authentication)

## Introduction

This is a learning repository for learning the MEVN stack which is 

- MongoDB
- ExpressJS
- VueJS
- NodeJS

I will be following this tutorial to get started https://www.positronx.io/vue-mevn-stack-tutorial-build-full-stack-vue-js-crud-app/ which creates a basic CRUD database

## installation

*run these commands with administrator privileges on windows, sudo on linux*

if nodejs is not installed, install it from https://nodejs.org/en/

install latest versions of npm and yarn

```js
node -v
# v10.15.3
npm install -g npm@latest 
npm -v 
# 7.20.6
npm install -g yarn 
yarn -v 
# 1.22.4
yarn global add @vue/cli 
```

## create our first mevn stack application

i build this incrementally `mevn-01`, `mevn-02` etc increasing in complexity every time so that at every stage we have a working application

- [mevn-01](projects/students/mevn-01) raw boiler plate code with vue2 *This version does not do anything so pretty much can be skipped*
- [mevn-02](projects/students/mevn-02-vue3-template) add one component file with router
- [mevn-03](projects/students/mevn-03) add bootstrap navbar
- [mevn-04](projects/students/mevn-04) add axios and further component for adding new records to database.  Develop the application to add the full back end api and the full front end application with CRUD operations - Create, Read, Update and Delete students.
- [mevn-05](projects/students/mevn-05) final version

The full application is built and is working at [projects/students/mevn-05](projects/students/mevn-05)

Thank you to https://www.positronx.io/ for creating this tutorial!!!!


# create a mevn stack application with authentication

now that we have the basics correct, let's build a second mevn application which has `jwt json web token` authentication built in.

- [login-01](projects/login/login-01) to get started with the back end, to install `mongodb` and start building the `api`
- [login-02](projects/login/login-02) finish the back end api and start on the front end - scaffold app and strip out boilerplate code
- [login-03](projects/login/login-03) finish building out the front end and connect everything to the back end and finish working app 

