const db = require("../models");
const Op = db.Sequelize.Op;
const paginate = require('jw-paginate');


// Find all waivers
findAll = (req, res, next) => {      
    console.log("findAll...")
    db.waiver.findAll
    ({
      
      include: {
        model: db.workflow,
        as: 'workflow',        
        attributes: ['ProcessedDate','WorkflowStatus']        
      },
        attributes: ['WaiverID', 'UEN', 'RequestDate','WaiverType','ApplicantName','Reasons']
      })

    .then(data => {        
        //console.log("All waivers:", JSON.stringify(data, null, 2));

        const items = data;
        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 5;
        const pager = paginate(items.length, page,pageSize);

        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({ pager, pageOfItems });
    })
    .catch(err => {
        console.log("Error!")
        console.log( err.message);
    });
  
} //end findAll

findOne = (req, res, next) => {      
    console.log("findOne...")
    const id = req.params.WaiverID;

    db.waiver.findOne({
        where: {
            WaiverID: id 
        },
        attributes: ['WaiverID', 'UEN', 'RequestDate','WaiverType','ApplicantName','Reasons']
      })
    .then(data => {
      console.log("Waivers with ID " + id + JSON.stringify(data, null, 2));
      return res.json(data)
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving waiver with id=" + id
      });
    });  
} //end findOne

findAllByUEN = (req, res, next) => {      
  console.log("findAllByUEN...")
  const uen = req.params.UEN;

  db.waiver.findAll({
      where: {
        UEN: uen
    },
    include: {
      model: db.workflow,
      as: 'workflow',        
      attributes: ['StaffID', 'ProcessedDate','WorkflowStatus','Comments'] 
    },
      attributes: ['WaiverID', 'UEN', 'RequestDate','WaiverType','ApplicantName','Reasons']


    })
  .then(data => {
    console.log("Waivers with UEN " + uen + JSON.stringify(data, null, 2));
    return res.json(data)
    //res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving waiver with uen=" + uen
    });
  });  
} //end findOne

module.exports = {findAll,findOne,findAllByUEN}

