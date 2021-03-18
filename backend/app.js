 /** Importing express module using require function */
 var express = require('express');
 var bodyParser = require('body-parser');
 var cors = require('cors');
 var app = express();
 var port = 3000;
 app.use(express.urlencoded({ extended: false }))

// parse application/json

app.use(express.json());
 app.use(cors());

//  app.use('/data', express.static(__dirname + '/uploads'));
 /** Listen on the port 3000 for connections */
 app.listen(port, () => {
     console.log('App listening on the port', + port);
 })
 


 /** import the router module */
 var taskRouter = require('./routes/task');
 var loginRouter = require('./routes/login');

 
 /** add the router to the middleware handling path*/
 app.use('/task',taskRouter);
 app.use('/user',loginRouter);


 module.exports = app;