const mongoose = require('mongoose');

const dbSchema = new mongoose.Schema({
  category: String,
  brand: String,
  search: String,
  results: [{
    _id: false,
    link: String,
    image: String,
    description:String,
    price: String
  }]
});

module.exports = mongoose.model('Products', dbSchema);
