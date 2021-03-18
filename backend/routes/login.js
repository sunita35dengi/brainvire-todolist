var express =  require('express');

/** express.Router middleware allows to group the router handler and access them by using common route prefix */
var router = express.Router();
var loginController = require('../src/controllers/loginController');



router.post('/login',loginController.login);
router.post('/register',loginController.signUp);
router.post('/logout',loginController.logout);







module.exports = router;