let dbParams = {};
if (process.env.DATABSE_URL) {
   dbParams.connectionString = "postgres://kwelbgvlzpnzkf:7008203550db7c8b7b1faec02be2bd6a8effcc0cdeb48d4481f6dc3df31a15d7@ec2-67-202-63-147.compute-1.amazonaws.com:5432/d743188jbfe6m"
//process.env.DATABASE_URL;
  //  dbParams.ssl= {
  //   rejectUnauthorized: false
  //   }
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
