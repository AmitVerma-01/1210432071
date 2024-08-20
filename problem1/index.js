const { log } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());

let products;
let companies;

fs.readFile('./products.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Failed to read file', err);
    return;
  }
  try {
    products = JSON.parse(data);
    companies = Object.keys(products);
  } catch (parseErr) {
    console.error('Failed to parse products data', parseErr);
  }
});

app.get('/test/companies', (req, res) => {
  if (!companies) {
    return res.status(500).json({ error: 'Data not yet loaded' });
  }
  res.json({ companies });
});

app.get('/test/companies/:companyName/categories', (req, res) => {
  const { companyName } = req.params;
  if (!products[companyName]) {
    return res.status(404).json({ error: 'Company not found' });
  }
  res.json({ companyName, categories: Object.keys(products[companyName]) });
});

app.get('/test/companies/:companyName/categories/:categoryName/products', (req, res) => {
  const { companyName, categoryName } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  if (!products[companyName] || !products[companyName][categoryName]) {
    return res.status(404).json({ error: 'Category or company not found' });
  }

  let items = products[companyName][categoryName];


  if (parseInt(minPrice) !== undefined && parseInt(maxPrice) !== undefined) {
    items = items.filter(item => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice));
  }
  
  if (top !== undefined) {
    items = items.slice(0, parseInt(top));
  }

  res.json({
    company: companyName,
    category: categoryName,
    items: items,
  });
});

app.get('/test/companies/:companyName/categories/:categoryName/products/:productId', (req, res) => {
  const { companyName, categoryName, productId } = req.params;
  if (!products[companyName] || !products[companyName][categoryName]) {
    return res.status(404).json({ error: 'Category or company not found' });
  }
  const product = products[companyName][categoryName][parseInt(productId) - 1];
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ company: companyName, category: categoryName, product });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
