let dbParams = {};
//if (process.env.NODE_ENV === 'development') {
  // dbParams.connectionString = process.env.DATABASE_URL;
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  };
// } else {
//   dbParams = {

//     connectionString: process.env.DATABASE_URL,
//     // ssl: true
//   };
// }

// if (process.env.ENV === 'production') {
//   dbParams.connectionString = process.env.DATABASE_URL;
//   dbParams.ssl = {
//     rejectUnauthorized: false
//   }

//   dbParams = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectionUnauthorized: false
//     }
//   };
//}

module.exports = dbParams;
