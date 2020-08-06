module.exports = (sequelize, Sequelize) => {

    const user = sequelize.define("user", 
       {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          name: { type: Sequelize.STRING},
          contact: { type: Sequelize.STRING},      
          email: { type: Sequelize.STRING},
          createdAt:{type: Sequelize.DATE},
          updatedAt:{type: Sequelize.DATE},
    
       },
    
      {
            tableName: 'users'
      }
    
    )
        
      
    return user;
    
};
