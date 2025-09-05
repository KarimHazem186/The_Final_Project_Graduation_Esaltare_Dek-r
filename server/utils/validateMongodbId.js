const mongoose = require("mongoose");
const validateMongoDbId = (id)=>{
    console.log(id)
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log("isValid Mongoose ",isValid)
    if(!isValid)
        throw new Error("This id is not valid or not Found");
};

module.exports=validateMongoDbId