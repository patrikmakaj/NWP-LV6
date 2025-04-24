const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  ime: String,
  prezime: String,
  uloga: String
});

module.exports = mongoose.model('Member', memberSchema);
