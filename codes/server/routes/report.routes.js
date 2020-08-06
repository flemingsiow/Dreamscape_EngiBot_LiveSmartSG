module.exports = app => {

  const reports = require("../controllers/report.controller.js");
  
  var router = require("express").Router();
  
  // Retrieve all Reports
  router.get("/", reports.findAll);
  
  // Retrieve reports by id
  router.get("/id/:id", reports.findByID);

  // Retrieve reports by title
  router.get("/get", reports.findByTitle);

  // Create a new Report
  router.post("/create", reports.createReport);
  
  app.use('/api/reports', router);
  
};
