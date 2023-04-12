let scrapeMercadoLivre = require("../../middleware/puppetService")

const getAll = async ({brand, category}) => {
    let getData = await scrapeMercadoLivre({brand, category})
    console.log(getData)
    return getData
  }
  
  module.exports = {
      getAll
  }