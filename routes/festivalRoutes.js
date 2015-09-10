var express = require('express');

var routes = function(Festival) {
  var router = express.Router();

  router.route('/festivals')

  /**
   * Get all festivals.
   */
    .get(function(req, res) {
      var query = req.query;
      Festival.find(query, function(err, festivals) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(festivals);
        }
      });
    })

  /**
   * Create a new festival.
   */
    .post(function(req, res) {
      var festival = new Festival(req.body);

      festival.save();
      res.status(201).send(festival);
    });

  router.route('/festivals/:festivalId')

  /**
   * Get a festival by id.
   */
    .get(function(req, res) {
      Festival.findById(req.params.festivalId, function(err, festival) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(festival);
        }
      });
    });

  return router;
};

module.exports = routes;