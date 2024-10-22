import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController{
    getProducts(req,res){
        let products=ProductModel.get();
        // console.log(products);
        
        // console.log("from Controller::",path.resolve());
        // return res.sendFile(path.join(path.resolve(),'/src','views','products.html'))
         
         res.render('products',{
            products:products,
            userEmail:req.session.userEmail,
           
        })



    }


    
    getAddForm(req,res,next){
        res.render('new-product',{
             errorMessages:null,
             userEmail:req.session.userEmail,
        })
      }

      addNewProduct(req,res,next){
      const {name,desc,price}=req.body;
      const imageUrl='images/'+req.file.filename;

       ProductModel.addNew(name,desc,price,imageUrl);
         let products=ProductModel.get();
         res.render('products',{
            products:products,
            // errorMessages:null,
            userEmail:req.session.userEmail,
         })
        
      }





      getUpdateProductView(req,res,next){
        // 1 check products is exist or not
        const id=req.params.id;
        const productFound=ProductModel.getById(id)
        if(productFound){
            return res.render('update-product',{
                products:productFound,
                errorMessages:null,  
                userEmail:req.session.userEmail,

            })
        }
         // 2 else return errors
        else{
             res.status(401).send("Product Not Found")
        }
       
       
      }



      postUpdateProduct(req,res,next){
        ProductModel.update(req.body);
        let products=ProductModel.get();
        res.render('products',{
           products:products,
           // errorMessages:null,
           userEmail:req.session.userEmail,
        })
      }



      deleteProduct(req,res){
        const id=req.params.id;
      
        const productFound=ProductModel.getById(id)
        if(!productFound){
           return  res.status(401).send("Product Not Found")

            }
        
         // 2 else return errors
        else{
            ProductModel.delete(id);
            let products=ProductModel.get();
            res.render('products',{
                products:products
                
               
            })
        }
       

      }
}