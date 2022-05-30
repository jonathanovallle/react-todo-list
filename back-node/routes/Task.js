const express = require("express")
const taskRoutes = express.Router();
const fs = require('fs');
var cors = require('cors')
var app = express()

app.use(cors())

const dataPath = './Details/task.json' 

// util functions 

const saveTaskData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getTaskData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


// reading the data
taskRoutes.get('/tasks', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  taskRoutes.post('/tasks/addTask', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
    var result = [];
    var existTasks = getTaskData()
    for(var i in existTasks)
        result.push(existTasks[i]);
    result.push(req.body)
    saveTaskData(result);
    res.send(JSON.parse(data));
  });
})

// Read - get all accounts from the json file
taskRoutes.get('/tasks/list', (req, res) => {
  const tasks = getTaskData()
  res.send(tasks)
})

// Update - using Put method
taskRoutes.put('/tasks/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existTasks = getTaskData()
    const taskId = req.params['id']
    existTasks[taskId-1].status = true
   console.log(existTasks[taskId-1].status);
   saveTaskData(existTasks);
    res.send(`task with id ${taskId} has been updated`)
  }, true);
});

//delete - using delete method
taskRoutes.delete('/tasks/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existTasks = getTaskData()
    const taskId = req.params['id'];
    delete existTasks[taskId];  
    saveTaskData(existTasks);
    const tasks = getTaskData()
    res.send(tasks)
  }, true);
})
module.exports = taskRoutes