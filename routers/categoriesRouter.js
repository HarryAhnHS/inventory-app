const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");
const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.allCategoriesGet);

categoriesRouter.get('/create', categoriesController.createCategoryGet);
categoriesRouter.post('/create', categoriesController.createCategoryPost);

categoriesRouter.get('/update/:id', categoriesController.editCategoryGet);
categoriesRouter.post('/update/:id', categoriesController.editCategoryPost);

module.exports = categoriesRouter;
