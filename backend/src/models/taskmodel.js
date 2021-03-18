const dbfun = require('../config/dbconfig');
const moment = require('moment');
const common = require('../helper/common');




var responseSend = { status: 'success', 'resultData': {} };

var addTask = async function (req, res) {
  try {
    let timezoneoffset = moment().utcOffset()
    // const currentDatetimestamp = moment(moment().format('YYYY-MM-DD')).add(timezoneoffset, 'minutes').format('X');
    const currenttimestamp = moment().add(timezoneoffset, 'minutes').format('X');
    let body = req.body;
    let name = body.name;
    let desc = body.description;
    let over_due_date = moment(moment(body.task_over_due_date).format('YYYY-MM-DD')).add(timezoneoffset, 'minutes').format('X');
    let isChecked = body.isChecked == false ? 0 : 1;
    let created_date = currenttimestamp;
    let iduser = req.iduser;
    console.log(iduser, "body", body, req.body.name)
    let taskQry = " INSERT INTO task (name , description,created_t,task_over_due_date,is_completed,iduser) VALUES($1, $2,$3,$4,$5,$6)";
    let taskValues = [name, desc, created_date, over_due_date,isChecked, iduser];
    console.log(taskQry,taskValues)
    let result = await dbfun.insertRow(taskQry, taskValues);
    if(result){
      let response={status:'OK', "message": "Task Added successfully"}

      return response;
    }
  }
  catch (e) {
    responseSend.status = 'error';
    responseSend.data = "Error inserting site history table info function ";
    return responseSend;
  }

}


var getTaskByUserId = async function (req, res) {
  console.log(req.body, 'body', req.iduser)
  try {
    let body = req.body;
    // let isCompletedArray = body.is_completed_array;
    let cond = '';
    let result;
    let userId = req.iduser;

    let dateConv =  moment(body.date,'  MM/DD/YYYY').format('YYYY-MM-DD');
    let start_time = dateConv + ' 00:00';
    let start_timestamp = await common.getTimestamp(start_time);
    let end_time = dateConv + ' 23:59:59';
    let end_timestamp = await common.getTimestamp(end_time);
    cond = cond + `SELECT * FROM task  WHERE iduser = ${userId} AND is_deleted=0 `
    if (body.date != null) {
      let date = body.date;
      cond = cond + ` AND (task_over_due_date>= ${start_timestamp} AND task_over_due_date <= ${end_timestamp}  ) `;
    }
    cond = cond + ` ORDER BY task_over_due_date ASC, created_t DESC`;
    // if (isCompletedArray.length > 0) {
    //   let task_completed_array = "" + isCompletedArray.join(",") + "";
    //   cond = cond + " AND T.is_completed IN (" + task_completed_array + ")"
    // }
    console.log(cond)
    result = await dbfun.selectAny(cond);
    responseSend.status = 'OK';
    responseSend.resultData = result;

    return responseSend;

  }
  catch (e) {
    responseSend.status = 'error';
    responseSend.error = e.message
    responseSend.message = "Error  selecting task function ";
    return responseSend;
  }

}



var updateTaskByTaskId = async function (req, res) {
  try {
    let timezoneoffset = moment().utcOffset()
    const currentDatetimestamp = moment(moment().format('YYYY-MM-DD')).add(timezoneoffset, 'minutes').format('X');
    let body = req.body;
    console.log(body,"body")
    let taskId = body.task_id;
    let name = body.name;
    let desc = body.description;
    let over_due_date = moment(moment(body.task_over_due_date).format('YYYY-MM-DD')).add(timezoneoffset, 'minutes').format('X');
    let isChecked = body.isChecked == false ? 0 : 1;
    let taskQry = "UPDATE task SET name = $1, description = $2 ,  task_over_due_date = $3, is_completed=$4  WHERE idtask = $5";
    let taskValues = [name, desc, over_due_date,isChecked, taskId];
    console.log(taskValues, "taskValues")
    let result = await dbfun.updateRow(taskQry, taskValues);
    if(result){
      let response={status:'OK', "message": "Task Updated successfully"}

      return response;
    }
  }
  catch (e) {
    responseSend.status = 'error';
    responseSend.error = e.message;
    responseSend.message = "Error inserting site history table info function ";
    return responseSend;
  }

}


var deleteTaskByTaskId = async function (req, res) {
  try {
    let body = req.body;
    let taskId = body.task_id;
    
    let taskQry = `UPDATE task SET is_deleted = 1 WHERE idtask = ${taskId}`;
    let result = await dbfun.updateRow(taskQry);
    if(result){
      let response={status:'OK', "message": "Task Deleted successfully"}

      return response;
    }
  }
  catch (e) {
    responseSend.status = 'error';
    responseSend.data = "Error while deleting  function ";
    return responseSend;
  }

}



var updateIsCompletedById = async function (req, res) {
  try {
    let body = req.body;
    let taskId = body.task_id;
    let is_completed = body.is_completed;
    
    let taskQry = `UPDATE task SET is_completed = ${is_completed} WHERE idtask = ${taskId}`;
    let result = await dbfun.updateRow(taskQry);
    return result;
  }
  catch (e) {
    responseSend.status = 'error';
    responseSend.data = "Error while updateIsCompletedById  function ";
    return responseSend;
  }

}

var getTaskById = async function (req, res) {
  try {
    let query = req.query;
    console.log(query, 'query')
    let taskId = query.idtask;    
    let taskQry = `SELECT * FROM task WHERE idtask = ${taskId} `;
    let result = await dbfun.selectOne(taskQry);
    return result;
  }
  catch (e) {
    responseSend.status = 'error';
    responseSend.data = "Error while get task  function ";
    return responseSend;
  }

}


module.exports = {
  addTask,
  getTaskByUserId,
  updateTaskByTaskId,
  deleteTaskByTaskId,
  updateIsCompletedById,
  getTaskById
}