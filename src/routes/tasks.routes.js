const express = require('express');
const router = express.Router();
const Task = require('../models/tasks'); 

router.get('/', async (req, res) => {

    const tasks = await Task.find();

    res.json(tasks);


})

router.get('/:id', async (req, res) => {

    const task = await Task.findById({_id: req.params.id})

    console.log(task)

    res.json(task);

})


router.post('/new', async (req, res) => {

    const { title, description } = req.body;
    const task = new Task ({ title, description})

    await task.save();

    console.log(task);

    res.json( { status: 'saved' })

});

router.put('/:id', async (req, res) =>  {

    const { title, description } = req.body;

    const task = { title, description};

    console.log(task)

    await Task.findByIdAndUpdate( req.params.id, task)

    //console.log(task)

    res.json( { status: 'update'})

});

router.delete('/:id', async (req, res) => {

    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'task deleted'});
})

module.exports = router;