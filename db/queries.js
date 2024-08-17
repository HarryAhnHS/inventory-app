const pool = require('./pool');

module.exports = {
    allItemsGet: async () => {
        const { rows } = await pool.query('SELECT * FROM items');
        return rows;
    },

    itemGet: async (id) => {
        const { rows } = await pool.query('SELECT * FROM items WHERE id=$1', [id]);
        return rows;
    },

    insertItem: async (body) => {
        const { name, brand, price, categoryid } = body;

        const query = `
            INSERT INTO items (categoryid, name, brand, price) 
            VALUES ($1,$2,$3,$4)
        `
        try {
            await pool.query(query, [categoryid, name, brand, price]);
            console.log(`Item ${name} inserted successfully`);
        }
        catch(error) {
            console.error(`Error inserting item ${name}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    },
    updateItem: async (id, body) => {
        const { categoryid, name, brand, price } = body;
        try {
            await pool.query('UPDATE items SET categoryid=$1, name=$2, brand=$3, price=$4 WHERE id=$5', 
                [categoryid, name, brand, price, id]);
            console.log(`Category ${id} edited successfully`);
        }
        catch(error) {
            console.error(`Error editing category ${id}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    },
    deleteItem: async (req) => {
        try {
            await pool.query("DELETE FROM items WHERE id=$1", [req.params.id]);
            console.log(`Item ${req.params.id} deleted successfully`);
        }
        
        catch(error) {
            console.error(`Error deleting item ${req.params.id}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    },




    allCategoriesGet: async () => {
        const { rows } = await pool.query('SELECT * FROM categories');
        return rows;
    },
    
    categoryGet: async (id) => {
        const { rows } = await pool.query('SELECT * FROM categories WHERE id=$1', [id]);
        return rows;
    },

    insertCategory: async (body) => {
        const { categoryname } = body;

        const query = `
            INSERT INTO categories (categoryname) 
            VALUES ($1)
        `
        try {
            await pool.query(query, [categoryname]);
            console.log(`Category ${categoryname} created successfully`);
        }
        catch(error) {
            console.error(`Error inserting category ${categoryname}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    },
    updateCategory: async (id, body) => {
        const { categoryname } = body;
        try {
            await pool.query('UPDATE categories SET categoryname=$1 WHERE id=$2', 
                [categoryname, id]);
            console.log(`Category ${id} edited successfully`);
        }
        catch(error) {
            console.error(`Error editing category ${id}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    },
    deleteCategory: async (req) => {
        try {
            await pool.query("DELETE FROM categories WHERE id=$1", [req.params.id]);
            console.log(`Category ${req.params.id} deleted successfully`);
        }
        
        catch(error) {
            console.error(`Error deleting category ${req.params.id}: `, error);
            throw error; // Rethrow error for handling at a higher level
        }
    },
}