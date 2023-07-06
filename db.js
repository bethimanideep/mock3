const mongoose=require("mongoose")
const connection = mongoose.connect("mongodb+srv://manideep:manideep@cluster0.ugp5u4z.mongodb.net/mock3")
const schema=mongoose.Schema({},{
    strict:false,
    versionKey:false
})
const usermodel=mongoose.model("user",schema)
module.exports={
    connection,
    usermodel
}