module.exports = (sequelize, Sequelize) => {

    const report= sequelize.define("report", 
     {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          title: { type: Sequelize.STRING },
          description: { type: Sequelize.STRING},    
          price: { type: Sequelize.DECIMAL(10, 2)},
          published:{type: Sequelize.BOOLEAN},
          createdAt:{type: Sequelize.DATE},
          updatedAt:{type: Sequelize.DATE},
    
     },

     {
            tableName: 'reports'
     }
    
    )
        
      
    return report;
    
    };
    