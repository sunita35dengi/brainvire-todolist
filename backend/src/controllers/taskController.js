const taskmodel = require('../models/taskmodel');
const exportexcelmodel = require('../models/excelexportmodel');



exports.addTask = async (req ,res) => {
    try{
      let result = await taskmodel.addTask(req);
      console.log(req.body, "body")
      return res.json(result);
    }
    catch(e){
      return res.json(e.message);
    } 
  }

  exports.getTaskByUserId = async (req ,res) => {
      try{
        let result = await taskmodel.getTaskByUserId(req);
        return res.json(result);
      }
      catch(e){
        return res.json(e.message);
      } 
    }

    exports.updateTaskByTaskId = async (req ,res) => {
      try{
        let result = await taskmodel.updateTaskByTaskId(req);
        return res.json(result);
      }
      catch(e){
        return res.json(e.message);
      } 
    }

    exports.deleteTaskByTaskId = async (req ,res) => {
      try{
        let result = await taskmodel.deleteTaskByTaskId(req);
        return res.json(result);
      }
      catch(e){
        return res.json(e.message);
      } 
    }
    
    exports.exportExcelTaskList = async (req ,res) => {
      try{
        let result = await exportexcelmodel.exportExcelTaskList(req);
        return res.json(result);
      }
      catch(e){
        return res.json(e.message);
      } 
    }
    
    
    exports.updateIsCompletedById = async (req ,res) => {
      try{
        let result = await taskmodel.updateIsCompletedById(req);
        return res.json(result);
      }
      catch(e){
        return res.json(e.message);
      } 
    }


    exports.getTaskById = async (req ,res) => {
      try{
        let result = await taskmodel.getTaskById(req);
        return res.json(result);
      }
      catch(e){
        return res.json(e.message);
      } 
    }
    