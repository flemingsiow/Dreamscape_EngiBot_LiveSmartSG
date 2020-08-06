module.exports = app => {

    const purchasetransactions = require("../controllers/purchasetransaction.controller.js");
    
    var router = require("express").Router();
    
    // Retrieve all purchasetransactions
    router.get("/", purchasetransactions.findAll);
    
    // Retrieve purchasetransactions by id
    router.get("/id/:id", purchasetransactions.findByID);
  
    // Create a new purchasetransaction
    router.post("/create", purchasetransactions.createPurchasetransaction);
    
    app.use('/api/purchasetransactions', router);
    
  };
  