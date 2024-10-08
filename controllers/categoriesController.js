const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const validateCategory = [
    body('categoryname')
      .trim()
      .notEmpty().withMessage('Name is required.'),
  ];


module.exports = {
    allCategoriesGet: async (req, res) => {
        const allCategories = await db.allCategoriesGet();
        console.log(allCategories)
        res.render('categories', {categories: allCategories, searchTerm: ''});
    },
    searchCategoriesGet: async (req, res) => {
        const searchTerm = req.query.search || '';
        const searchCategories = await db.searchCategoriesGet(searchTerm);
        res.render('categories', {categories: searchCategories, searchTerm: searchTerm});
    },
    createCategoryGet: (req, res) => {
        res.render('categoriesForm');
    },
    createCategoryPost: [validateCategory, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('categoriesForm', {
                errors: errors.array(),
            })
        }
        await db.insertCategory(req.body);
        res.redirect('/categories');
    }],
    editCategoryGet: async (req, res) => {
        const categoryToUpdate = await db.categoryGet(req.params.id);
        res.render('updateCategoriesForm', {
            category: categoryToUpdate,
        });
    },
    editCategoryPost: [validateCategory, async (req, res) => {
        const categoryToUpdate = db.categoryGet(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('updateCategoriesForm', {
                errors: errors.array(),
                category: categoryToUpdate,
            })
        }
        await db.updateCategory(req.params.id, req.body);
        res.redirect('/categories');
    }],
    deleteCategoryPost: async (req, res) => {
        await db.deleteCategory(req);
        res.redirect('/categories');
    },
}