const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();

itemsRouter.get('/', itemsController.allItemsGet);

itemsRouter.get('/create', itemsController.createItemGet);
itemsRouter.post('/create', itemsController.createItemPost);

module.exports = itemsRouter;
