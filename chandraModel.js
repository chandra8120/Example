import { Schema,model } from "mongoose"

const chandraSchema=new Schema({
    item:{type:String,required:true},
    price:{type:Number,required:true},
    comment:{type:String,required:true},
    message:{type:String,required:true}
})
const Chandra=model("Chandra",chandraSchema)
export default Chandra