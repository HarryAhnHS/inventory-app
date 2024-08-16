const pool = require('./pool');

module.exports = {
    allItemsGet: async () => {
        const { rows } = await pool.query('SELECT * FROM items');
        return rows;
    }
}