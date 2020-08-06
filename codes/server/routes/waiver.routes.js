/*var express = require('express');
var router = express.Router();
var waiverController = require("../controllers/waiver.controller.js");

// Home page route.
router.get('/test', function (req, res) {
  res.send('Wiki home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

// Retrieve a single Tutorial with id
router.get("/", waiverController.findAllWaivers);

// Retrieve a single Tutorial with id
router.get("/api/items/:id", waiverController.findOne);

module.exports = router;
*/

module.exports = app => {
  const waivers = require("../controllers/waiver.controller.js");

  var router = require("express").Router();
  
  // Retrieve all 
  router.get("/", waivers.findAll);

  // Retrieve all 
  router.get("/test", waivers.findAll);

  // Retrieve a single 
  router.get("/api/items/:id", waivers.findOne);  

  app.use('/', router);
};
