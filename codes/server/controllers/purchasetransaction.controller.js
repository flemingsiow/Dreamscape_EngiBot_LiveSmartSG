const db = require("../models");
const Op = db.Sequelize.Op;
const paginate = require('jw-paginate');

findAll = (req, res, next) => {      
    db.purchasetransaction.findAll(
      {include: [{
        model: db.report,
        as: 'report',        
        attributes: ['title','description'] 
      },  
       {
        model: db.user,
        as: 'user',        
        attributes: ['name'] 
      }],  

      attributes: ['id','reportid', 'userid', 'amountpaid','createdAt']}
      
    )
    .then(data => {                    
      const items = data;
        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 10;
        const pager = paginate(items.length, page,pageSize);

        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({ pager, pageOfItems });
    })
    .catch(err => {
        console.log( err.message);
    });
} //end findAll


findByID = (req, res, next) => {      
    
    const id = req.params.id;
  
    db.purchasetransaction.findAll({
        where: {
          id: id
      },      
       attributes: ['id','reportid', 'userid', 'amountpaid']
  
  
      })
    .then(data => {
      console.log("Purchase transactions with id " + id + JSON.stringify(data, null, 2));
      return res.json(data)
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving purchase transactions with id=" + id
      });
    });  
} //end findByID



/** createPurchaseTransaction */
createPurchasetransaction = (req, res) => {
    // Validate request
    if (!req.body.reportid) {
      res.status(400).send({
        message: "Cannot create transaction record with missing data"
      });
      return;
    }
  
    const purchasetransaction = {     
      "reportid": req.body.reportid,
      "userid": req.body.userid,
      "amountpaid": req.body.amountpaid,
    };  
  
    // Save record in the database
    db.purchasetransaction.create(purchasetransaction)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the purchase transaction record."
        });
      });
  };
  

  module.exports = {findAll,findByID,createPurchasetransaction}