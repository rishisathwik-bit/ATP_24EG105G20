import {Schema,model} from 'mongoose';

const empSchema = new Schema({
    name:{
        type:String,
        required:[true,"Namee is mandatory"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"email already exists"]
    },
    mobile:{
        type:Number,
        required:[true,"mobile is required"]
    },
    designation:{
        type:String,
        required:[true,"designation is required"]
    },
    companyName:{
        type:String,
        required:[true,"Company Name is required"]
    }
},{
    versionKey:false,
    timestamps:true,
});

export const EmployeeModel = model('employee',empSchema);