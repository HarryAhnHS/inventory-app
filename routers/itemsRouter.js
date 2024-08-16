const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();

itemsRouter.get('/', itemsController.allItemsGet);

module.exports = itemsRouter;
