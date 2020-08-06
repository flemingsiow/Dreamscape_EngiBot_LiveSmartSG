/*`WaiverID` int(11) NOT NULL AUTO_INCREMENT,
  `RequestDate` datetime NOT NULL,
  `WaiverType` varchar(255) NOT NULL,
  `Reasons` text,
  `UEN` varchar(20) NOT NULL,
  `ApplicantName` varchar(60) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  */

  // https://sequelize.org/v5/manual/data-types.html
//https://bezkoder.com/node-js-sequelize-pagination-mysql/
 module.exports = (sequelize, Sequelize) => {
    const waiver = sequelize.define("waiver", {

    WaiverID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RequestDate: {
        type: Sequelize.DATE 
    },
    WaiverType: {
            type: Sequelize.STRING
    },
    Reasons: {
        type: Sequelize.STRING
    },
    
    UEN: {
        type: Sequelize.STRING
    },
    
    ApplicantName: {
        type: Sequelize.STRING
      },

    
    Phone: {
        type: Sequelize.STRING
    },

    
    Email: {
        type: Sequelize.STRING
      }
    },
    
    {
        tableName: 'waiver'
    },
    { timestamps: false }

    );
  
    return waiver;
  };