const pool = require('./pool');

module.exports = {
    allItemsGet: async () => {
        const { rows } = await pool.query('SELECT * FROM items');
        return rows;
    },

    insertItem: async (body) => {
        const { name, brand, price, categoryId } = body;

        const query = `
            INSERT INTO items (categoryId, name, brand, price) 
            VALUES ($1,$2,$3,$4)
        `
        try {
            await pool.query(query, [categoryId, name, brand, price]);
            console.log(`Item ${name} inserted successfully`);
        }
        catch {
            console.error(`Error inserting item ${name}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    },

    allCategoriesGet: async () => {
        const { rows } = await pool.query('SELECT * FROM categories');
        return rows;
    },
    insertCategory: async(body) => {
        const { categoryname } = body;

        const query = `
            INSERT INTO categories (categoryname) 
            VALUES ($1)
        `
        try {
            await pool.query(query, [categoryname]);
            console.log(`Category ${categoryname} created successfully`);
        }
        catch {
            console.error(`Error inserting category ${categoryname}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    }
}