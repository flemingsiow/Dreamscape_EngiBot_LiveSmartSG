const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const paginate = require('jw-paginate');
const db = require("./models");
const waiver_controller = require("./controllers/waiver.controller.js");
const workflow_controller = require("./controllers/workflow.controller.js");
const sns_helper = require("./aws_helpers/sns_helpers.js");
//const router = require("./routes/waiver.routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(require("body-parser").json())
app.use(express.static('public'))

// paged items route
app.get('/api/items', (req, res, next) => {
    waiver_controller.findAll(req,res,next);
});

app.get('/api/items/:WaiverID', (req, res, next) => {
    waiver_controller.findOne(req,res,next);
     // Retrieve a single Tutorial with id 
});

app.get('/api/uen/:UEN', (req, res, next) => {
    waiver_controller.findAllByUEN(req,res,next);
     // Retrieve a single Tutorial with id 
});

app.get('/api/workflow/waiver/:WaiverID', (req, res, next) => {
    workflow_controller.findAllByWaiverID(req,res,next);
     // Retrieve a single Tutorial with id 
});

send_sms_and_return_response = (hp, msg) => {
    

    console.log("Sending SMS (in server.js)")
    
    sns_helper.publish_to_handphone(hp,msg)//.then(outcome => {
      //res.send(data)

    //});

} //end send_sms_and_return_response

app.post('/api/workflow/create', (req, res, next) => {
    
    workflow_controller.createWorkflow(req,res,next);
    //send_sms_and_return_response(hp,msg)
    /*const sns_helper = require("../aws_helpers/sns_helpers")

    console.log("Sending SMS (in server.js)")
    var hp = "+6597492609"
    var msg = "Status of your application is now " + 
    sns_helper.publish_to_handphone(hp,msg)*/
     
});


require("./routes/report.routes")(app);
require("./routes/purchasetransaction.routes")(app);
require("./routes/user.routes")(app);
require("./routes/refundrequest.routes")(app);
require("./routes/company.routes")(app);

//require("./routes/waiver.routes")(app);

// start server
var port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server listening on port ' + port));
