//------------------------------------------------------------------------------
//const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// User Route Exports
//------------------------------------------------------------------------------
module.exports = ({ addUser,
  getUserByEmail,
  getUserByID,
  updateUserName,
  updateUserEmail,
  updateUserPassword }) => {
  //------------------------------------------------------------------------------
  router.get("/register", (req, res) => {

    req.session.user_id ? res.redirect('/resources') : res.render('registration_page', { user: req.session.user_id });
  });
  //------------------------------------------------------------------------------
  router.post("/register", (req, res) => {

    const user = req.body;
    //user.password = bcrypt.hashSync(req.body.password, 10)
    user.password = req.body.password;
    getUserByEmail(req.body.email)
      .then(data => {
        if (!data) {
          addUser(user)
            .then(user => {
              console.log(user)
              req.session.user_id = user.id;
              return res.redirect("/resources")
            })
        } else {
          req.session.message = {
            intro: "User Already Exists:",
            message: "Please login or register using a different email"
          }
          res.redirect("/register")
        }
      })
  })
  //------------------------------------------------------------------------------
  router.get("/login", (req, res) => {
    req.session.user_id ? res.redirect('/resources') : res.render('login_form', { user: req.session.user_id });
  });
  //------------------------------------------------------------------------------
  router.post("/login", (req, res) => {
    // check iif any of the field is empty
    const { email, password } = req.body;
    if (!email || !password) {
      // show the message on the screen without redirecting to error message
      req.session.message = {
        intro: " Empty fields:",
        message: "Please insert the requested information!"
      }
      return res.redirect("/login")
    }

    getUserByEmail(email)
      .then(user => {
        if (!user) {
          req.session.message = {
            intro: "User Does Not Exist:",
            message: "Please register an account!"
          }
          res.redirect("/register")
        //} else if (user.email === email && bcrypt.compareSync(password, user.password)) {
        } else if (user.email === email && password === user.password) {
          req.session.user_id = user.id;
          return res.redirect("/resources");
        } else {
          req.session.message = {
            intro: " Email or Password is Incorrect:",
            message: "Please note that passwords are case-sensitive"
          }
          res.redirect("/login")
        }
      })
  })
  //------------------------------------------------------------------------------
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/resources");
  });
  //------------------------------------------------------------------------------
  router.get("/users/:id", (req, res) => {
    // take you to the user profile
    if (!req.session.user_id) {

      req.session.message = {
        intro: " Cannot Access:",
        message: "Please Login or Register!"
      }
      return res.redirect("/login")
    }
    getUserByID(req.session.user_id)
      .then(user => {
        const templateVars = { user: req.session.user_id }
        return res.render("user_profile", templateVars);
      })
      .catch(err => res.send(err.message));
  });
  //------------------------------------------------------------------------------
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
      //updateUserPassword(user, bcrypt.hashSync(req.body.password, 10))
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
    res.render("../views/user_profile", { user: req.session.user_id })

  });
  //------------------------------------------------------------------------------
  return router;
};
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
