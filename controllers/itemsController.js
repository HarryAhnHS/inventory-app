const db = require('../db/queries');
const { body, validationResult } = require('express-validator');
const { search } = require('../routers/itemsRouter');

const validateItem = [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required.'),
    
    body('brand')
      .trim(),
  
    body('price')
      .isFloat({ gt: 0 }).withMessage('Price must be a positive number.')
      .toFloat(),
  
    body('categoryid')
      .notEmpty().withMessage('Category must be selected.')
  ];

module.exports = {
    fetchItemsGet: async (req, res) => {
        const allCategories = await db.allCategoriesGet();
        const selectedCategories = req.query.categories || [];
        // Edge case - handle single categoryid selection
        const categoryIds = Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories];
        console.log(categoryIds);

        const items = await db.fetchItemsGet(categoryIds);

        res.render('items', {
            items: items, 
            categories: allCategories, 
            selectedCategories: categoryIds,
            searchTerm: ''
        });
    },
    searchItemsGet: async (req, res) => {
        const allCategories = await db.allCategoriesGet();

        const searchTerm = req.query.search || '';
        const searchItems = await db.searchItemsGet(searchTerm);
        res.render('items', {
            items: searchItems, 
            categories: allCategories, 
            searchTerm: searchTerm,
        });
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
    }],
    editItemGet: async (req, res) => {
        const itemToUpdate = await db.itemGet(req.params.id);
        const allCategories = await db.allCategoriesGet();
        res.render('updateItemsForm', {
            categories: allCategories,
            item: itemToUpdate,
        });
    },
    editItemPost:[validateItem, async (req, res) => {
        console.log("post");
        const itemToUpdate = await db.itemGet(req.params.id);
        const allCategories = await db.allCategoriesGet();

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('updateItemsForm', {
                categories: allCategories,
                item: itemToUpdate,
                errors: errors.array(),
            })
        }
        await db.updateItem(req.params.id, req.body);
        res.redirect('/items');
    }],
    deleteItemPost: async (req, res) => {
        await db.deleteItem(req);
        res.redirect('/items');
    },
}