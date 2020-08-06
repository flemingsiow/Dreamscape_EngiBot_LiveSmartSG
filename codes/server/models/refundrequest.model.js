module.exports = (sequelize, Sequelize) => {

    const refundrequest= sequelize.define("refundrequest", 
     {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          purchaseid: { type: Sequelize.INTEGER},
          approvalstatus: { type: Sequelize.STRING },
          remarks: { type: Sequelize.STRING},    
          createdAt:{type: Sequelize.DATE},
          updatedAt:{type: Sequelize.DATE},
    
     },

     {
            tableName: 'refundrequests'
     }
    
    )
        
      
    return refundrequest;
    
    };
