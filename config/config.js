require("dotenv").config();

const { PGDATABASE, PGHOST, PGPASSWORD, PGUSER, PGPORT } = process.env;

module.exports = {
  development: {
    username: PGUSER,
    password: PGPASSWORD,
    database: "db_dev_assignment2",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432,
  },
  test: {
    username: PGUSER,
    password: PGPASSWORD,
    database: "db_test_assignment2",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432,
  },
  production: {
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    dialect: "postgres",
    port: PGPORT,
  },
};
