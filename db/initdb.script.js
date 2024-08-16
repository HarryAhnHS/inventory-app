#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryname text
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryId INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    name text,
    brand text,
    price float
);

INSERT INTO categories (categoryName) 
VALUES
    ('Fresh Produce'),
    ('Meat'),
    ('Beverages'),
    ('Snacks'),
    ('Household Items');

INSERT INTO items (categoryId, name, brand, price)
VALUES
    (1, 'Apple', 'Brand A', 0.99),
    (1, 'Banana', 'Brand B', 0.49),
    (2, 'Chicken Breast', 'Brand C', 5.99),
    (2, 'Ground Beef', 'Brand D', 4.99),
    (3, 'Orange Juice', 'Brand E', 3.49),
    (3, 'Soda', 'Brand F', 1.99),
    (4, 'Chips', 'Brand G', 2.99),
    (4, 'Chocolate Bar', 'Brand H', 1.49),
    (5, 'Detergent', 'Brand I', 6.99),
    (5, 'Paper Towels', 'Brand J', 3.99);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Done");
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    await client.end();
  }
}

main();
