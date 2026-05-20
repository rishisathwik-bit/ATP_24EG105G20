import { Schema ,model,Types} from "mongoose";

// create  Cart Schema {product ,count}
const cartSchema=new Schema({
    product:{
        type:Types.ObjectId,
        ref:"product"  //name of the Product Model
    },
    count:{
        type:Number,
        default:1
    }
})

const userSchema =new Schema({
    //structure of user resource
    username: {
        type:String,
        required:[true,"Username is Required"],
        minLength:[4,"Min Length of Username is 4 chars"],
        maxLength:[6,"Max Length of Username is 6 chars"],
    },
    password:{
        type:String,
        required:[true,"Password Required"],
    },
    email:{
        type:String,
        required:[true,"Email Required"],
        unique:[true,"Email already existed"]
    },
    age:{
        type:Number,
    },
    cart:[cartSchema]
},{
    versionKey:false,
    timestamps:true
});

export const UserModel=model("user",userSchema)