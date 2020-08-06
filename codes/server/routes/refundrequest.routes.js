module.exports = app => {

    const refundrequests = require("../controllers/refundrequest.controller.js");
    
    var router = require("express").Router();
    
    // Retrieve all refundrequests
    router.get("/", refundrequests.findAll);
    
    // Retrieve refundrequests by refundid
    router.get("/id/:id", refundrequests.findByID);
  
    // Create a new refundrequest
    router.post("/create", refundrequests.createrefundrequest);
    
    app.use('/api/refundrequests', router);
    
  };
  