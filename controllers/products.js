const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = 'ab';
  const products = await Product.find({
    name: {$regex: search, $options: 'i'}
  })
  res.status(200).json({
    products
  })
}

const getAllProducts = async (req, res) => {
  const  { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i'};
  }

  if (company) {
    queryObject.company = company;
  }
  const products = await Product.find(queryObject)
                                .limit(10)
                                .sort(req.query.sort);
  res.status(200).json({
    products
  })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}