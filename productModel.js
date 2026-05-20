import { Schema,model } from "mongoose";

const productSchema =new Schema({
    productId:{
        type:Number,
        required:[true,"ProductId is requied"],
    },
    productName:{
        type:String,
        required:[true,"ProductName is Required"]
    },
    price:{
        type:Number,
        minPrice:[10000,"Minimum Product Price is 10000"],
        maxprice:[50000,"Max Price is 50000"]
    },
    brand:{
        type:String,
        required:[true,"Brand Name is Required"],
    }},
    {
        versionKey:false,
        timestamps:true
    },

);
export const productModel=model("product",productSchema);