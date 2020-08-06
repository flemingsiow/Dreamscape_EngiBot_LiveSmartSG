module.exports = app => {

    const companies = require("../controllers/company.controller.js");
    
    var router = require("express").Router();
    
    // Retrieve all companys
    router.get("/", companies.findAll);
    
    // Retrieve companys by companyid
    router.get("/id/:id", companies.findByID);
  
    // Create a new company
    router.post("/create", companies.createcompany);
    
    app.use('/api/companies', router);
    
  };
  