var express =  require('express');

/** express.Router middleware allows to group the router handler and access them by using common route prefix */
var router = express.Router();
var taskController = require('../src/controllers/taskController');
var checkToken = require('./checkinToken')();




router.post('/addTask', checkToken.checkReq,taskController.addTask);
router.post('/getTaskByUserId', checkToken.checkReq, taskController.getTaskByUserId);
router.put('/updateTaskByTaskId', checkToken.checkReq, taskController.updateTaskByTaskId);

// Instead of deleting task just updating isdeleted = 1 bcz in future  we need all added task then we can show all deleted and non-deleted task
router.put('/deleteTaskByTaskId', checkToken.checkReq, taskController.deleteTaskByTaskId);
router.put('/updateIsCompletedById', checkToken.checkReq, taskController.updateIsCompletedById);

router.post('/exportExcelTaskList', checkToken.checkReq, taskController.exportExcelTaskList);
router.get('/getTaskById', checkToken.checkReq, taskController.getTaskById);












module.exports = router;