const searchService = require('../services/searchService')

const getAll = async (req, res) => {
  const {brand, category} = req.params;
  const search = await searchService.getAll({brand, category})
  return res.status(200).json(search)
}

module.exports = {
    getAll
}