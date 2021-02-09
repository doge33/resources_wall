//------------------------------------------------------------------------------
const express = require('express');
const router = express.Router();
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Resource Route Exports
//------------------------------------------------------------------------------
module.exports = ({ getAllResources, addResource, myResources, getResourceByID, addResourceReview, getQueryResource, getAllReviews, addResourceTopic, getResourceIDReviewID, getLike, myLikedResources }) => {

  router.get("/api/resources/", (req, res) => {

    const { search } = req.query;

    if (!search) {
      getAllResources()
        .then(data => {
          res.json({ data });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      getQueryResource(search)
        .then(result => {
          res.json(result)
        })
        .catch(err => err.message)
    }
  });
  //------------------------------------------------------------------------------
  router.get("/api/resources/:id", (req, res) => {

    const resourceID = req.params.id;

    getResourceByID(resourceID)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })
  //------------------------------------------------------------------------------
  router.get("/api/resources/:id/reviews", (req, res) => {

    const resourceID = req.params.id;

    getAllReviews(resourceID)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })
  //------------------------------------------------------------------------------
  router.get("/api/resources/:id/reviews/:r_Id", (req, res) => {

    const { id, r_Id } = req.params;

    getResourceIDReviewID(r_Id, id)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })
  //------------------------------------------------------------------------------
  router.get("/api/resources/:id/reviews/:r_Id/liked", (req, res) => {

    const { id, r_Id } = req.params;

    getLike(r_Id, id)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })
  //------------------------------------------------------------------------------
  router.get("/resources", (req, res) => {

    getAllResources()
      .then(data => {
        const resources = data;
        const templateVars = {
          resourceList: resources,
          user: req.session.user_id
        };
        res.render("main_page", templateVars)
      })
      .catch(e => res.send(e));
  });
  //------------------------------------------------------------------------------
  //------------------------------------------------------------------------------
  // router.get("/", (req, res) => {
  //   console.log('at home page!')


  //   res.redirect("/resources")

  // });
  //------------------------------------------------------------------------------
  router.post("/resources", (req, res) => {

    const resource = req.body;
    const currentUser = req.session.user_id;
    addResource(resource, currentUser)
      .then(data => {
        const addedResource = data[0];
        if (resource.topic) {
          addResourceTopic(resource.topic, addedResource.id);
        }
      })
    res.redirect("/resources");
  });
  //------------------------------------------------------------------------------
  router.get("/users/:id/resources", (req, res) => {
    const currentUser = req.session.user_id;

    const promise1 = Promise.resolve(myResources(currentUser));
    const promise2 = Promise.resolve(myLikedResources(currentUser));

    Promise.all([promise1, promise2])
      .then(data => {
        const resources = data[0];
        const likedResources = data[1];
        const templateVars = {
          resourceList: resources,
          likedResourceList: likedResources,
          user: currentUser
        };
        res.render("user_resources", templateVars);
      })
      .catch(e => res.send(e));
  });
  //------------------------------------------------------------------------------
  router.get("/resources/:id", (req, res) => {
    const resourceID = req.params.id;

    getResourceByID(resourceID)
      .then(data => {
        const resource = data;
        const templateVars = {
          aResource: resource,
          user: req.session.user_id,
          id: req.params.id
        }
        res.render('resource', templateVars);
      })
      .catch(e => res.send(e));
  });
  //------------------------------------------------------------------------------
  router.post("/resources/:id/reviews", (req, res) => {

    const currentUser = req.session.user_id;
    const resourceID = req.params.id;
    let review = req.body;
    review.rating = parseInt(review.rating);
    if (!review.comment) {
      review.comment = 'no comment'
    }

    addResourceReview(review, currentUser, resourceID);

    res.redirect(`/resources/${resourceID}`);

  });
//------------------------------------------------------------------------------
  return router;
};
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
