const db = require("../models");
const Op = db.Sequelize.Op;
const paginate = require('jw-paginate');

const sns_helper = require("../aws_helpers/sns_helpers.js");

// Find all 
findAll = (req, res, next) => {      
    console.log("findAll...")
    db.workflow.findAll
    ({
        attributes: ['WorkflowID','WaiverID', 'UEN', 'ProcessedDate','WorkflowStatus']
    })

    .then(data => {                

        const items = data;
        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pager = paginate(items.length, page);

        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({ pager, pageOfItems });
    })
    .catch(err => {
        console.log("Error!")
        console.log( err.message);
    });
  
} //end findAll

findAllByWaiverID = (req, res, next) => {      
  console.log("findAllByWaiverID...")
  const waiverid = req.params.WaiverID;

  db.workflow.findAll({
      where: {
          WaiverID: waiverid
      },
      attributes: ['WorkflowID','WaiverID', 'UEN', 'ProcessedDate','WorkflowStatus','Comments','StaffID']
    })
  .then(data => {
    //console.log("Workflows with WaiverID" + waiverid + JSON.stringify(data, null, 2));
    return res.json(data)
    //res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving workflows with waiverid=" + waiverid
    });
  });  
} //end findOne

findAllByUEN = (req, res, next) => {      
    console.log("findOne...")
    const uen = req.params.UEN;

    db.workflow.findAll({
        where: {
            UEN: uen
        },
        attributes: ['WorkflowID','WaiverID', 'UEN', 'ProcessedDate','WorkflowStatus','StaffID','Comments']
      })
    .then(data => {
      console.log("Workflows with UEN" + id + JSON.stringify(data, null, 2));
      return res.json(data)
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving workflows with uen=" + uen
      });
    });  
} //end findOne

createWorkflow = (req, res) => {

  console.log("workflowcontroller: createWorkflow...")

  // Validate request
  if (!req.body.waiverid || !req.body.comments || !req.body.workflowstatus || !req.body.uen) {
    res.status(400).send({
      message: "Cannot create workflow with missing data"
    });
    return;
  }

  const workflow = {
    
    "WaiverID": req.body.waiverid,
    "Comments": req.body.comments,
    "WorkflowStatus": req.body.workflowstatus,
    "UEN": req.body.uen
  };  

  //const waiver_controller = require("./controllers/waiver.controller.js");


  // Save workflow in the database
  db.workflow.create(workflow)
    .then(data => {      
          //res.send(data)

          if (req.body.workflowstatus.indexOf("Approve")!=-1 || req.body.workflowstatus.indexOf("Reject")!=-1){
            var handphonenumber = "+6594506537"
            var message = "Status of your application with ID " + req.body.waiverid + " : " + req.body.workflowstatus;
            
            console.log(`HP: ${handphonenumber} MSG: ${message}`)
            console.log(`HP: ${typeof(handphonenumber)} MSG: ${typeof(message)}`)

            var AWS = require('aws-sdk');        
            AWS.config.update({region: 'ap-southeast-1'});
            console.log(`HP: ${handphonenumber} MSG: ${message}`)
            console.log(`HP: ${typeof(handphonenumber)} MSG: ${typeof(message)}`)

            var params = {
                Message:  message.toString(),
                PhoneNumber: handphonenumber.toString(),
            };

            var sns = new AWS.SNS({apiVersion: '2010-03-31'})

            sns.setSMSAttributes({
              attributes:{
                  MonthlySpendLimit: "20", //Change to something u use
                  DefaultSenderID: "acraflemingsiow",
                  DefaultSMSType: "Transactional" 
              }
          });
          // Create promise and SNS service object
          var publishTextPromise = sns.publish(params).promise();

          // Handle promise's fulfilled/rejected states
          publishTextPromise.then(
            function(data) {
                console.log(data);
                console.log("MessageID is " + data.MessageId);
                res.send({"success": true, "result": data});
            }).catch(
            function(err) {
                console.log("Error sending SMS " + err.message)
                res.status(500).send({"success": false, "result": err});
                //console.error(err, err.stack);
            });
          }
      }) //end first then

      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Workflow."
        });
        
      });
};

module.exports = {findAll,findAllByWaiverID,findAllByUEN,createWorkflow}

