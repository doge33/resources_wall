let dbParams = {};
if (process.env.DATABSE_URL) {
   dbParams.connectionString = process.env.DATABASE_URL;
//process.env.DATABASE_URL;
   dbParams.ssl= {
    rejectUnauthorized: false
    }
  } else {
    dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
