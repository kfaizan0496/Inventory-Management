
import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import middlewareValidation from './src/middleware/middleware.validation.js';
import UserController from './src/controllers/userController.js';
import auth from './src/middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisitMiddleware.js';

import ProductController from './src/controllers/product_controller.js'
import { uploadFile } from './src/middleware/file-upload-middleware.js';


const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(cookieParser());
// app.use(setLastVisit)
app.set('view engine','ejs')
app.set('views',path.join(path.resolve(),'src','views'));
app.use(ejsLayouts)
app.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
const productController =new ProductController();
const userController=new UserController();


app.get('/register',userController.getRegister)
app.get('/login',userController.getLogin)
app.post('/register',userController.postRegister);
app.post('/login',userController.postLogin)

app.get('/',setLastVisit,auth,productController.getProducts)
app.get('/new',auth,productController.getAddForm)
app.post('/',auth,uploadFile.single('imageUrl'),middlewareValidation,productController.addNewProduct)
app.get('/update-product/:id',auth,productController.getUpdateProductView)
app.post('/update-product',middlewareValidation,productController.postUpdateProduct)
app.use(express.static('src/views'))
app.post('/delete-product/:id',auth,productController.deleteProduct)
app.get('/logout',userController.logOut)
app.listen(3200,(req,res)=>{
    console.log("Server is up and running");
    
})