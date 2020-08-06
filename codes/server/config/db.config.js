module.exports = {
    HOST: "acradb.cnpozz3diuvu.us-east-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "aWsMySQLpassw0rd",
    DB: "acrabot",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };