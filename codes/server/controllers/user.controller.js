const db = require("../models");
const Op = db.Sequelize.Op;
const paginate = require('jw-paginate');

findAll = (req, res, next) => {      
    db.user.findAll({attributes: ['id','name', 'contact', 'email']})
    .then(data => {                    
        const items = data;
        
        const page = parseInt(req.query.page) || 1;

        
        const pageSize = 10;
        const pager = paginate(items.length, page,pageSize);

        
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        
        return res.json({ pager, pageOfItems });
        //return res.json(data);
        
    })
    .catch(err => {
        console.log( err.message);
    });
} //end findAll


findByID = (req, res, next) => {      
    
    const id = req.params.id;
  
    db.user.findAll({
        where: {
          id: id
      },      
       attributes: ['id','name', 'contact', 'email']
  
  
      })
    .then(data => {
      console.log("User id is " + id + JSON.stringify(data, null, 2));
      return res.json(data)
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user id with = " + id
      });
    });  
} //end findByID



/** createuser */
createuser = (req, res) => {
    const user = {     
      "name": req.body.name,
      "contact": req.body.contact,
      "email": req.body.email,
    };  
  
    // Save record in the database
    db.user.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user record."
        });
      });
  };
  

  module.exports = {findAll,findByID,createuser}