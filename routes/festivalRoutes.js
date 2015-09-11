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
      festival.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(festival);
        }
      });

    });

  /**
   * Middleware for requests sent to an id
   */
  router.use('/festivals/:festivalId', function(req, res, next) {
    Festival.findById(req.params.festivalId, function(err, festival) {
      if(err) {
        res.status(500).send(err);
      } else if(festival) {
        req.festival = festival;
        next();
      } else {
        res.status(404).send('festival not found');
      }
    });
  });

  router.route('/festivals/:festivalId')

  /**
   * Get a festival by id.
   */
    .get(function(req, res) {
      var returnFestival = req.festival.toJSON();
      returnFestival.links = {};
      var locationFilter = 'http://' + req.headers.host + '/api/festivals?location=' + returnFestival.location;
      returnFestival.links.filterByLocation = locationFilter.split(' ').join('%20');
      res.json(returnFestival);
    })

  /**
   * Update a festival
   */
    .put(function(req, res) {
      req.festival.name = req.body.name;
      req.festival.location = req.body.location;
      req.festival.attended = req.body.attended;
      req.festival.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.festival);
        }
      });
      res.json(festival);
    })
    .patch(function(req, res) {
      if (req.body._id) {
        delete req.body._id;
      }
      for(var property in req.body) {
        req.festival[property] = req.body[property];
      }

      req.festival.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.festival);
        }
      });
    })

  /**
   * Delete a festival
   */
    .delete(function(req, res) {
      req.festival.remove(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('removed');
        }
      });
    });

  return router;
};

module.exports = routes;