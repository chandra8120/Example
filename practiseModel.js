import {Schema,model} from 'mongoose'

const practiseSchema=new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}
})
const Practise=model("Practise",practiseSchema)
export default Practise