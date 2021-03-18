const dbfun = require('../config/dbconfig');
const moment = require('moment');
const jwt  = require('jsonwebtoken');
const atob = require('atob');
const crypto = require('crypto'); 




var responseSend = {status:'success','resultData':{}};


var login = async function(req) {
	var now = new Date();
    let timezoneoffset  = moment().utcOffset()
	const currentDatetimestamp = moment(moment().format('YYYY-MM-DD')).add(timezoneoffset, 'minutes').format('X');
	const data = req.body;
	var email = data.email.toLowerCase().trim();
	var password =  atob(data.password.trim()).toLowerCase();
	const q = "SELECT  * FROM users as U WHERE U.email = $1 AND U.password = $2" ;
	var resp =await dbfun.selectOne(q,[email,data.password]);
	
	if(resp && resp.status!=='error'){
		var iduser = resp.iduser;
		const tokenData = {iduser : iduser   , 'lastcreated': currentDatetimestamp };
		var tokens = await generateToken(tokenData);
		await insertToken(iduser, tokens, currentDatetimestamp , iduser);
		resp.access_tokens = tokens;

		resp.signature = await getLoginSignature(iduser , email);
		responseSend.status="success";
		responseSend.resultData = resp;
		responseSend.message="";
	}
	else{
		responseSend.status="error";
		responseSend.message="Sorry, the email or password is incorrect.";
		responseSend.resultData = {}
	}
	return responseSend;

}

async function generateToken(data){
	const tockens = jwt.sign(data, 'secret' , { expiresIn: 60 * 60 * 24 * 365 } );
	return tockens;
}

async function insertToken(iduser, token,created_time){

	if(token!=="" && iduser >0){
		const updateTocken = "UPDATE users SET access_token = $1 , created_t = $2 WHERE iduser = $3 "
	
		await dbfun.updateRow(updateTocken, [token,created_time,iduser]);
	}
	

}



async function getLoginSignature(iduser , email){

	try {
		
		const signature = crypto
						.createHmac('sha256', 'DGPyyw+0o7Fe48v5jXQ5qp0OtixRGnofoinSCQWQNy4=')
						.update((email))
						.digest('hex');

		return signature;
						
	} catch (error) {
		
		console.log("error from getLoginSignature : " , error );
	}

}


var responseSend = {status:'success','resultData':{}};


var signUp = async function(req) {
	console.log(req.body, 'body')

	try{
		var now = new Date();
		let timezoneoffset  = moment().utcOffset()
		const currentDatetimestamp = moment(moment().format('YYYY-MM-DD')).add(timezoneoffset, 'minutes').format('X');
		const body = req.body;
		let first_name = body.firstName;
		let last_name = body.lastName;
		let email = body.email;
		let password = body.password;
		
		const query = "INSERT INTO users (first_name, last_name,email,password,created_t) VALUES($1, $2,$3,$4,$5)" ;
		let values = [first_name,last_name,email,password,currentDatetimestamp]
		let result = await dbfun.insertRow(query, values);
		responseSend.status="success";
		responseSend.resultData = result;
		responseSend.message="";
	}
	catch(e){
		responseSend.status = 'error';
		responseSend.data = "Error inserting users into  function ";
		return responseSend;
	}
	
	return responseSend;

}


var logout = async function (req, res) {
	try {
	  let body = req.body;
	  let iduser = req.iduser;
	  
	  let Qry = `UPDATE users SET access_token = '' WHERE iduser = ${iduser}`;
	  let result = await dbfun.updateRow(Qry);
	  return result;
	}
	catch (e) {
	  responseSend.status = 'error';
	  responseSend.data = "Error while logout  function ";
	  return responseSend;
	}
  
  }

module.exports = {
	login,
	signUp,
	logout
  }