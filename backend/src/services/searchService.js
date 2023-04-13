const scrape = require("../../middleware/puppetService")
const Products = require('../models/searchModels')

const getAll = async ({brand, category, q}) => {
    let products = await Products.find({
        category: `${category.toLowerCase()}`,
        brand: `${brand.toLowerCase()}`,
        search: `${q.toLowerCase()}`
    }) 
    if (products.length >= 1) return products
    let results = await scrape({brand, category, q})
    let newData = {
        category,
        brand,
        search: q,
        results
    };
    await Products.create(newData);
    return [newData];
  }
  
  module.exports = {
      getAll
  }