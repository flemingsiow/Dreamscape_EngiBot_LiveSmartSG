module.exports = (sequelize, Sequelize) => {

    const company = sequelize.define("company", 
       {
          CompanyName: { type: Sequelize.STRING},
          UEN: { type: Sequelize.STRING, primaryKey: true},
          Status: { type: Sequelize.STRING},      
          ADDRESS: { type: Sequelize.STRING},
          Industry:{type: Sequelize.STRING},
   
       },
    
      {
            tableName: 'companies'
      ,
      timestamps: false ,
      defaultScope: { 
        attributes: 
        {
          exclude: ['created_at', 'updated_at']
        }}
      }      
      
   
    )
        
      
    return company;
    
};
