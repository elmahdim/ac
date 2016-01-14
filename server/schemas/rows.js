var mongoose = require('mongoose');

var RowsSchema = mongoose.Schema({
  type: {
    type: String,
    trim: true
  },
  value: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Rows', RowsSchema);