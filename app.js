const express = require('express');

const path = require('path')
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');


app.use(session({
    secret: "TOP SECRET",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(userLoggedMiddleware);


app.use(express.static('public'));
app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(methodOverride('_method'))





const mainRoutes = require('./src/routes/mainRoutes');
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.use('/', mainRoutes)
app.use('/products', productRoutes)
app.use('/', userRoutes)
/*
app.use((req,res,next)=>{
    res.status(404).render('not-found')
    })
*/
app.listen (process.env.PORT ||3000, ()=>{
    console.log('Servidor funcionando bien');
});

