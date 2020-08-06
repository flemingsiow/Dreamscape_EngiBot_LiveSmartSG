module.exports = app => {

    const users = require("../controllers/user.controller.js");
    
    var router = require("express").Router();
    
    // Retrieve all users
    router.get("/", users.findAll);
    
    // Retrieve users by userid
    router.get("/id/:id", users.findByID);
  
    // Create a new user
    router.post("/create", users.createuser);
    
    app.use('/api/users', router);
    
  };
  