/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();


module.exports = ({ addUser, getUserByEmail }) => {
  // router.get("/api/users", (req, res) => {

  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       console.log(users)
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     })
  // });

  /**
   * --Queries --
   * const getUserByID = function(id) {
   *  return db.query(`SELECT * FROM users WHERE id = $1`, [id]).then(res => res.rows);
   * }

   * const updateUserName = function(email, name) {
   *  return db.query(`UPDATE users SET name = $2 WHERE email = $1 RETURNING *`, [email, name]).then(res => res.rows);
   * }
   *
   * const updateUserEmail = function(id, email) {
   *  return db.query(`UPDATE users SET email = $2 WHERE id = $1 RETURNING *`, [id, email]).then(res => res.rows);
   * }
   *
   * const updateUserPassword = function(email, password) {
   *  return db.query(`UPDATE users SET password = $2 WHERE email = $1 RETURNING *`, [email, password]).then(res => res.rows);
   * }
   *
   * getAllResources
   * getUserResource
   * addResource
   *
   * addReview
   * getUserReview
   *
   * -- Function--
   * login
   * register
   *
   */

  // register route for the user
  router.get("/register", (req, res) => {
    res.render("registration_page")
  });

  router.post("/register", (req, res) => {

    const user = req.body;
    user.password = bcrypt.hashSync(req.body.password, 10)

    addUser(user)
      .then(user => {
        req.session.user_id = user.id;
      })
    return res.redirect("/resources")
  })


  router.get("/login", (req, res) => {
    res.render("login_form");
  });

  router.post("/login", (req, res) => {

    const email = req.body.email;
    getUserByEmail(email)
      .then(user => {
        req.session.user_id = user.id;
        res.redirect("/resources");
      })
  })

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/resources");
  });




  router.get("/users/:id", (req, res) => {
    // take you to the user profile

    req.session.user_id = req.params.id;

    console.log('inside get /users/:id, the req.session is ---', req.session);
    getUserByID(req.session.user_id)
      .then(user => {
        //
        const templateVars = { user: user }
        return res.render("user_profile", templateVars);
      })
      .catch(err => res.send(err.message));
  });


  router.post("/users/:id", (req, res) => {
    // submits information to the db to update user info
    const user = req.session.user_id
    console.log('current user ID is ---', user);
    if (req.body.name) {
      updateUserName(user, req.body.name)
        .then(data => {
          console.log('UPDATE USER NAME SUCCESS')
          console.log(data);

        })
        .catch(err => {
          if (err) {
            res.status(403).json({ error: err.message });
          }
        });

    } if (req.body.email) {
      updateUserEmail(user, req.body.email)
        .then(data => {
          console.log('UPDATE EMAIL SUCCESS')
          console.log(data);
          ;
        })
        .catch(err => {
          if (err) {
            res.status(403).json({ error: err.message });
          }
        });

    } if (req.body.password) {
      updateUserPassword(user, req.body.password)
        .then(data => {
          console.log('update user password SUCCESS')
          console.log(data);

        })
        .catch(err => {
          if (err) {
            res.status(403).json({ error: err.message });
          }
        });;
    }
    res.render("../views/user_profile")

  });


  return router;
};
