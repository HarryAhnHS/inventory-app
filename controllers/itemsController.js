const db = require('../db/queries');

module.exports = {
    allItemsGet: async (req, res) => {
        const allItems = await db.allItemsGet();
        res.render('items', {items: allItems});
    },
}