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
        res.render('categories', {categories: allCategories});
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
    }]
}