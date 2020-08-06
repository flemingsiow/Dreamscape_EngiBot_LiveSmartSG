/*

CREATE TABLE `workflow` (
  `WorkflowID` int(11) NOT NULL AUTO_INCREMENT,
  `WaiverID` int(11) NOT NULL,
  `ProcessedDate` datetime NOT NULL,
  `UEN` varchar(20) NOT NULL,
  `StaffID` varchar(20) NOT NULL,
   `WorkflowRemarks` text NOT NULL,
  `WorkflowStatus` varchar(100) NOT NULL,
  PRIMARY KEY (`WorkflowID`)
) ;
*/

  // https://sequelize.org/v5/manual/data-types.html
//https://bezkoder.com/node-js-sequelize-pagination-mysql/

 module.exports = (sequelize, Sequelize) => {
    const workflow = sequelize.define("workflow", {
    WorkflowID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    WaiverID: {
        type: Sequelize.INTEGER
    },
    ProcessedDate: {
        type: Sequelize.DATE 
    },
    
    UEN: {
        type: Sequelize.STRING
    },
    
    StaffID: {
        type: Sequelize.STRING
      },    
    
    WorkflowStatus: {
        type: Sequelize.STRING
      },
    Comments:{
      type: Sequelize.STRING
    }
  },
    {
        tableName: 'workflow'
    ,
    timestamps: false ,
    defaultScope: { 
      attributes: 
      {
        exclude: ['created_at', 'updated_at']
      }}
    }
    )
    
  
    return workflow;
  };