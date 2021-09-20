const express = require('express');
const studentRoute = express.Router();
let StudentModel = require('../models/Student');

studentRoute.route('/update-student/:id').put((req, res, next) => {
  console.log(`attempting to update one student with id ${req.params.id}`)
  console.log(`request body = `)
  console.log(JSON.stringify(req.body))
  console.log(req.body)
  StudentModel.updateOne({_id:req.params.id},
     { $set: req.body },
   (error, data) => {
    if (error) {
      console.log(`an error has taken place`)
      return next(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})
studentRoute.route('/create-student').post((req, res, next) => {
  console.log('creating one student at /create-student')
  StudentModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(`student created ${JSON.stringify(data)}`)
    res.json(data)
  }
})
});
studentRoute.route('/edit-student/:id').get((req, res, next) => {
  console.log('get one student at /edit-student/:id')
   StudentModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
studentRoute.route('/delete-student/:id').delete((req, res, next) => {
  console.log('delete one student at /delete-student/:id')
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
studentRoute.route('/').get((req, res, next) => {
  console.log('GET all students')
    StudentModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })
module.exports = studentRoute;
