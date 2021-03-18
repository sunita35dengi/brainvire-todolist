const  db = require('../config/connection');
const pgp = require('pg-promise')({
    capSQL: true
});


var selectOneRow = async function(query='', parameter=[]) {
  if(query!=="" && query!==null){
    try {
        if(parameter && parameter.length>0){
            return  await db.one(query,parameter);
        }else{
            return await db.one(query);
        }
      }
      catch(e) {
        if(e){
          //console.log(e);
          var response = {'status':'error','message':e.message,'query': e.query}
          return response;
        }
      }
  }
}


var selectMultiRow = async function(query='',parameter=[]) {
  if(query!=="" && query!==null){
    try {
        if(parameter && parameter!=="" && parameter.length>0){
            return  await db.any(query,parameter);
        }else{
            return await db.any(query);
        }
      }
      catch(e) {
        if(e){
          var response = {'status':'error','message':e.message,'query': e.query}
          return response;
        }
      }
  }
}

var insertRow = async function(query='',parameter=[],returnVal=false) {
  if(query!=="" && query!==null){
    try {
      console.log(parameter, 'parameter');
      console.log(query, 'query')
        if(parameter && parameter!=="" && parameter.length>0){
          if(returnVal) return  await db.one(query,parameter);
          else { await db.none(query,parameter);  return true;}
        }else{
          if(returnVal)  return await db.one(query);
          else {  await db.none(query); return true;}
        }
      }
      catch(e) {
        if(e){ console.log(e);
          var response = {'status':'error','message':e.message,'query': e.query}
          return response;
        }
      }
  }
}
var insertMultiRows =async function(table='', column=[], data=[]){
  if(table!=="" && column.length>0 && data.length>0){
    try {
      var cs = new pgp.helpers.ColumnSet(column, {table: table});
      var query = pgp.helpers.insert(data, cs);
      await db.none(query); return true;
    }
    catch(e) {
      if(e){ console.log(e);
        var response = {'status':'error','message':e.message,'query': e.query}
        return response;
      }
    }
  }else{return false;}

}

var updateRow = async function(query='',parameter=[]) {
  if(query!=="" && query!==null){
    try {
        if(parameter && parameter!=="" && parameter.length>0){
        await db.none(query,parameter);  return true;
        }else{
          await db.none(query); return true;
        }
      }
      catch(e) {
        if(e){ console.log(e);
          var response = {'status':'error','message':e.message,'query': e.query}
          return response;
        }
      }
  }
}


var Delete =   async function(query='',parameter=[]) {
  try {
      if(parameter && parameter!=="" && parameter.length>0){
        var result = await db.result(query,parameter);
        return (result.rowCount && result.rowCount>0) ?  true : false;

      }else{
        var result =  await db.result(query);
        return (result.rowCount && result.rowCount>0) ?  true : false;
      }
    }
    catch(e) {
      if(e){ //console.log(e);
        var response = {'status':'error','message':e.message,'query': e.query}
        return response;
      }
    }
}

module.exports = {
  selectAny: selectMultiRow,
  selectOne: selectOneRow,
  insertRow: insertRow,
  insertMultiRows: insertMultiRows,
  updateRow: updateRow,
  delete : Delete
}
