import {body,validationResult} from 'express-validator';





export default async function validateRequest(req,res,next){
    // const {name,desc,price,imageUrl}=req.body;
    // let errors=[];
    // if(!name || name.trim()==''){
    //     errors.push("Name is Required")
    // }
    // if(!price || parseFloat(price)<1){
    //     errors.push("price Must be Positive")
    // }
    // try{
    //     const validUrl=new URL(imageUrl);

    // }catch(err){
    //     errors.push("Url is Invalid")
    // }

    // if(errors.length>0){
    //     return res.render('new-product',{
    //         errorMessages:errors[0],
    //     })   
    // }

    const rules=[
        body('name').notEmpty().withMessage("Name is Required"),
        body('price').isFloat({gt:0}).withMessage("price should be positive"),
        //  without Multer
        // body('imageUrl').isURL().withMessage('invalid URL')

        // with Multer
        body('imageUrl').custom((value,{req})=>{
            if(!req.file){
                throw new Error("Image is Required")
            }
            return true;
        })

    ];

    await Promise.all(rules.map(rule=>rule.run(req)));

    var validationErrors=validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.render('new-product',{
                    errorMessages:validationErrors.array()[0].msg,
                })   
    }








    next();

}