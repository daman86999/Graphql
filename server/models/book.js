const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  name: String,
  genre: String,
  authorName: String,
});

module.exports = mongoose.model('Book', bookSchema);
