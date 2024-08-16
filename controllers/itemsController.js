const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const validateItem = [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required.'),
    
    body('brand')
      .trim(),
  
    body('price')
      .isFloat({ gt: 0 }).withMessage('Price must be a positive number.')
      .toFloat(),
  
    body('categoryId')
      .notEmpty().withMessage('Category must be selected.')
  ];

module.exports = {
    allItemsGet: async (req, res) => {
        const allItems = await db.allItemsGet();
        res.render('items', {items: allItems});
    },
    createItemGet: async (req, res) => {
        const allCategories = await db.allCategoriesGet();
        res.render('itemsForm', {categories: allCategories});
    },
    createItemPost: [validateItem, async (req,res) => {
        const allCategories = await db.allCategoriesGet();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('itemsForm', {
                categories: allCategories,
                errors: errors.array(),
            })
        }
        await db.insertItem(req.body);
        res.redirect('/items');
    }]
}