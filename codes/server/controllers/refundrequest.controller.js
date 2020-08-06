const db = require("../models");
const Op = db.Sequelize.Op;
const paginate = require('jw-paginate');

findAll = (req, res, next) => {      
    db.refundrequest.findAll({attributes: ['id','purchaseid', 'approvalstatus', 'remarks']})
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
  
    db.refundrequest.findAll({
        where: {
          id: id
      },      
       attributes: ['id','purchaseid', 'approvalstatus', 'remarks']
  
  
      })
    .then(data => {
      console.log("Refund transactions with id " + id + JSON.stringify(data, null, 2));
      return res.json(data)
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving refund transactions with id=" + id
      });
    });  
} //end findByID



/** createrefundrequest */
createrefundrequest = (req, res) => {
    // Validate request
    if (!req.body.purchaseid) {
      res.status(400).send({
        message: "Cannot create refund record with missing data"
      });
      return;
    }
  
    const refundrequest = {     
      "id": req.body.id,
      "approvalstatus": req.body.approvalstatus,
      "remarks": req.body.remarks,
    };  
  
    // Save record in the database
    db.refundrequest.create(refundrequest)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the refund transaction record."
        });
      });
  };
  

  module.exports = {findAll,findByID,createrefundrequest}
