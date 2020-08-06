module.exports = (sequelize, Sequelize) => {

    const purchasetransaction = sequelize.define("purchasetransaction", 
       {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          reportid: { type: Sequelize.INTEGER},
          userid: { type: Sequelize.INTEGER},      
          amountpaid: { type: Sequelize.DECIMAL(10, 2)},
          createdAt:{type: Sequelize.DATE},
          updatedAt:{type: Sequelize.DATE},
    
       },
    
      {
            tableName: 'purchasetransactions'
      }
    
    )
        
      
    return purchasetransaction;
    
};
    