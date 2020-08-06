const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.waiver = require("./waiver.model.js")(sequelize, Sequelize);
db.workflow = require("./workflow.model.js")(sequelize, Sequelize);
db.report = require("./report.model.js")(sequelize, Sequelize);
db.purchasetransaction = require("./purchasetransaction.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.refundrequest = require("./refundrequest.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);

db.waiver.hasMany(db.workflow, {as: "workflow", sourceKey: 'WaiverID', foreignKey: 'WaiverID'});
db.workflow.belongsTo(db.waiver, { as: "waiver", targetKey: "WaiverID", foreignKey: 'WaiverID' })

db.report.hasMany(db.purchasetransaction, {as: "purchasetransaction", sourceKey: "id", foreignKey: "reportid"});
db.purchasetransaction.hasOne(db.report, {as: "report", sourceKey: "reportid", foreignKey: "id"});
db.user.hasMany(db.purchasetransaction, {as: "purchasetransaction", sourceKey: "id", foreignKey: "userid"});
db.purchasetransaction.hasOne(db.user, {as: "user", sourceKey: "userid", foreignKey: "id"});


//db.waiver.hasMany(db.workflow, { sourceKey: 'WaiverID', foreignKey: 'WaiverID' });
//db.workflow.belongsTo(db.waiver, {foreignKey: 'WaiverID' } ); // This creates the `leaderId` foreign key in Ship.
//db.workflow.hasOne(db.waiver, {});
//db.waiver.belongsToMany(db.workflow, { through: UserProject });

module.exports = db;