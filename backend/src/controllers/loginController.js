const loginmodel = require('../models/loginmodel');


exports.login = async (req ,res) => {
    try{
      let result = await loginmodel.login(req);
      return res.json(result);
    }
    catch(e){
      return res.json(e.message);
    } 
  }

  exports.signUp = async (req ,res) => {
    try{
      let result = await loginmodel.signUp(req);
      return res.json(result);
    }
    catch(e){
      return res.json(e.message);
    } 
  }

  exports.logout = async (req ,res) => {
    try{
      let result = await loginmodel.logout(req);
      return res.json(result);
    }
    catch(e){
      return res.json(e.message);
    } 
  }

