const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();

itemsRouter.get('/', itemsController.fetchItemsGet);

itemsRouter.get('/create', itemsController.createItemGet);
itemsRouter.post('/create', itemsController.createItemPost);

itemsRouter.get('/update/:id', itemsController.editItemGet);
itemsRouter.post('/update/:id', itemsController.editItemPost);

itemsRouter.post('/delete/:id', itemsController.deleteItemPost);

itemsRouter.get('/search', itemsController.searchItemsGet);

module.exports = itemsRouter;
