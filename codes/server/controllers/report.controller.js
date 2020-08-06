const db = require("../models");
const Op = db.Sequelize.Op;
const paginate = require('jw-paginate');

/** findAll */
findAll = (req, res, next) => {      
    db.report.findAll({attributes: ['id','title', 'price','description']})
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

/** findByID */
findByID = (req, res, next) => {      
    
    const id = req.params.id;
  
    db.report.findAll({
        where: {
          id: id
      },      
      attributes: ['id','title', 'price']
  
  
      })
    .then(data => {
      console.log("Reports with id " + id + JSON.stringify(data, null, 2));
      return res.json(data)
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving reports with id=" + id
      });
    });  
} //end findByID


/** findByTitle */
findByTitle = (req, res) => {    
    const title =  req.query.title;

    if (!title) {
      res.status(400).send({
        message: "No search term for title provided"
      });
      return;
    }    

    let searchQuery = '%' + title + '%'

    db.report.findAll({
        where: {
            title: {
                [Op.like]: searchQuery
            }
        },      
        attributes: ['id','title', 'price']
      })
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
    });

  } //end findByTitle
  
  
  


/** createReport */
createReport = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Cannot create report with missing data"
    });
    return;
  }

  const report = {     
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
  };  

  // Save record in the database
  db.report.create(report)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the report record."
      });
    });
};


module.exports = {findAll,findByID,findByTitle,createReport}
