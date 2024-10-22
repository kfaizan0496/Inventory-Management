import UserModel from "../models/userModel.js";
import ProductModel from "../models/product.model.js";
export default class UserController{
    getRegister(req,res){
        res.render('register')
    }

    getLogin(req,res){
        res.render('login',{
            errorMessages:null
        })
    }

    postRegister(req,res){
        const {name,email,password}=req.body;
         UserModel.add(name,email,password);
         res.render('login',{
            errorMessages:null
         });
    }

     postLogin(req,res){
        const{email,password}=req.body;
       const user= UserModel.isValidUser(email,password);
        if(!user){
         return   res.render('login',{
                errorMessages:"Invalid Credentials"
            })
        }
        req.session.userEmail=email;
        let products=ProductModel.get();
     return   res.render('products',{
            products:products,
            userEmail:req.session.userEmail,
           
        })
     }

     logOut(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log('Error in destroying session',err);
                
            }else{
                res.redirect('/login')
            }
        })
        res.clearCookie('lastVisit');
     }
}
