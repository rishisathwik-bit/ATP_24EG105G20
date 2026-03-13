import exp from 'express'
import {productModel} from '../models/productModel.js'
export const productApp=exp.Router()


productApp.post("/products",async(req,res)=>{
    const newproduct=req.body;
    const  productDocument=new productModel(newproduct)
    const result=await productDocument.save()
    console.log("result: ",result)
    res.status(201).json({message:"User Create"});
});

productApp.get("/products",async(req,res)=>{
    const products=await productModel.find();
    res.status(200).json({message:"products",payload:products})
})

productApp.get("/products/:id",async(req,res)=>{
    const pid=req.params.id
    
    const IdProduct=await productModel.findById(pid)
   res.status(200).json({message:"product",payload:IdProduct})
})

productApp.put("/products/:id",async(req,res)=>{
    const UpdateProduct=req.body;
    const pid=req.params.id;
    const newProduct=await productModel.findByIdAndUpdate(pid,
        {$set:{...UpdateProduct}},
        {new:true,runValidators:true});
  res.status(200).json({message:"Updated Product",payload:newProduct})
})


productApp.delete("/products/:id",async(req,res)=>{
    const pid=req.params.id;
    let deleteProduct=await productModel.findByIdAndDelete(pid)
    res.status(200).json({message:"Product Deleted",payload:deleteProduct})
})