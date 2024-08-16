const db = require('../db/queries');

module.exports = {
    allCategoriesGet: async (req, res) => {
        const allCategories = await db.allCategoriesGet();
        console.log(allCategories)
        res.render('categories', {categories: allCategories});
    },
}