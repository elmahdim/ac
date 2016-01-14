var schemas = require('../../server/schemas/all');

module.exports = function(app) {
  app
    .get('/api/rows', function(req, res) {
      schemas.Rows.find({}).exec(function(err, data) {
        if (err) {
          res.status(500).json(err);
        } else {
          if (data.length === 0) {
            var dataPlaceholder = new schemas.Rows({
              type: 'String',
              value: 'Lorem'
            });
            dataPlaceholder.save(function(err, row) {
              if (err) {
                res.status(500).json(err);
              } else {
                res.json([row]);
              }
            });
          } else {
            res.json(data);
          }
        }
      });
    })
   .post('/api/add', function (req, res, next) {
       var row   = new schemas.Rows(req.body);
       var type  = row.type;
       var value = !isNaN(row.value);
       if (type === 'number' && value === false) { return false; }
       row.save(function (err, row) {
          if (err) {
              res.status(500).json(err);
          } else {
              res.json({'success': true});
          }
       });
    })
    .get('/api/edit/:id', function (req, res) {
     var id = req.params.id;
     schemas.Rows.findOne({_id:id}, function(err, foundObj){
      if(err) {
       console.log(err);
       res.status(500).json(err);
      } else {
       if(!foundObj) {
        res.status(400).json();
       } else {
        res.json(foundObj);
       }
      }
     });
    })
    .put('/api/update/:id', function (req, res) {
     var id = req.params.id;
     schemas.Rows.findOne({_id:id}, function(err, foundObj){
      if(err) {
       console.log(err);
       res.status(500).json(err);
      } else {
       if(!foundObj) {
        res.status(400).json();
       } else {
        if(req.body.type) {
         foundObj.type = req.body.type;
        }
        if(req.body.value) {
         foundObj.value = req.body.value;
        }
        
        foundObj.save(function(err, updatedObj){
         if(err) {
          console.log(err);
          res.status(500).send();
         } else {
         //res.send(updatedObj);
         res.json(updatedObj);
         }
        });
       }
      }
     });
    })
    .delete('/api/remove/:id', function (req, res) {
      schemas.Rows.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json();
        }
      })
    })
    .get('/partials/:partialPath', function(req, res) {
      res.render('partials/' + req.params.partialPath);
    })
    .get('/*', function(req, res) {
      res.render('index');
    });
}