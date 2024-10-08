require('dotenv').config();
var express = require('express');
const path = require('path');
const itemsRouter = require('./routers/itemsRouter');
const categoriesRouter = require('./routers/categoriesRouter');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()); // For parsing application/json
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
});

app.get('/', (req,res) => {
    res.redirect('/items');
})

app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}/ !`);
})