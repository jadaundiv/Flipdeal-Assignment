const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// Endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;

  res.send(totalCartPrice.toString());
});

// Endpoint 2

function membershipStatus(cartTotal, isMember) {
  if (isMember === 'true') {
    let discountedPrice = cartTotal - (cartTotal * discountPercentage) / 100;
    return discountedPrice.toString();
  } else {
    return cartTotal.toString();
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(membershipStatus(cartTotal, isMember));
});

// Endpoint 3

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalTax = (cartTotal * taxRate) / 100;
  res.send(totalTax.toString());
});

// Endpoint 4

function shippingMethodType(shippingMethod, distance) {
  let result;
  if (shippingMethod === 'express') {
    result = distance / 100;
    return result.toString();
  } else {
    result = distance / 50;
    return result.toString();
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(shippingMethodType(shippingMethod, distance));
});

// Endpoint 5

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

//  Endpoint 6

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoint = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoint.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
