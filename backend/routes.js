var express = require('express')
var router = express.Router()

const step = require('./models/step')
const task = require('./models/task')
const section = require('./models/section')
const action = require('./models/action')
const nested = require('./models/nested')

router.get('/', (req, res) => {
    res.send('Hello world!')
})


// step
router.get('/step', (req, res) => {
    step.find((err, dbres) => {
      res.send(dbres)
    })
})

router.get('/step/:name', (req, res) => {
  step.find(
    { "name": { "$regex": req.params.name, "$options": "i" } }, (err, dbres) => {
    res.send(dbres)
  })
})

router.post('/step', (req, res) => {
  res.send(req.body)
})


//task
router.get('/task', (req, res) => {
  task.find((err, dbres) => {
    res.send(dbres)
  })
})


// section
router.get('/section', (req, res) => {
  section.find((err, dbres) => {
    res.send(dbres)
  })
})


// action
router.get('/action', (req, res) => {
  action.find((err, dbres) => {
    res.send(dbres)
  })
})


// nested
router.get('/nested', (req, res) => {
    nested.find((err, dbres) => {
        res.send(dbres)
    })
})


// reset
router.get('/reset', async (req, res) => {

    try {
        await step.collection.drop()
    } catch (err) {
        // res.status(500)
        // res.send('failed to drop collection')
    }

    try {
        await task.collection.drop()
    } catch(err) { }

    try {
        await section.collection.drop()
    } catch(err) { }

    try {
        await action.collection.drop()
    } catch(err) { }

    try {
        await nested.collection.drop()
    } catch(err) { }

    var newSteps = [
        {_id:0,name:"fill out form",complete: false},
        {_id:1,name: "send form to hiring manager for aprovle",complete: false},
        {_id:2,name:"fill out form",complete: false},
        {_id:3,name: "send form to hiring manager for aprovle",complete: false},
        {_id:4,name:"fill out form",complete: false},
        {_id:5,name: "send form to hiring manager for aprovle",complete: false}
    ]
    var newTasks = [
        {_id:0,name:"fill out form A",complete:false,steps:[0,1]},
        {_id:1,name:"fill out form B",complete:false,steps:[2,3]},
        {_id:2,name:"fill out form C",complete:false,steps:[4,5]}
    ]
    var newSections = [
        {_id:0,name:"Pre-onboarding forms",complete:false,tasks:[0,1]},
        {_id:1,name:"After arrival forms",complete:false,tasks:[2]}
    ]
    var newAction = new action({_id:0,name:"Onboarding",complete:false,sections:[0,1]})
    var newNested = new nested({_id:0,name:"Onboarding",complete:false,sections:[{_id:0,name:"Pre-onboarding forms",complete:false,tasks:[{_id:0,name:"fill out form A",complete:false,steps:[{_id:0,name:"fill out form",complete: false}, {_id:1,name: "send form to hiring manager for aprovle",complete: false}]}, {_id:1,name:"fill out form B",complete:false,steps:[{_id:2,name:"fill out form",complete: false}, {_id:3,name: "send form to hiring manager for aprovle",complete: false}]}]}, {_id:1,name:"After arrival forms",complete:false,tasks:[{_id:2,name:"fill out form C",complete:false,steps:[{_id:4,name:"fill out form",complete: false}, {_id:5,name: "send form to hiring manager for aprovle",complete: false}]}]}]})

    await step.collection.insertMany(newSteps)
    await task.collection.insertMany(newTasks)
    await section.collection.insertMany(newSections)
    await newAction.save()
    await newNested.save()

    res.send({msg: 'done!'})
})


module.exports = router