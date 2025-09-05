const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token) {
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                // console.log(decoded); // { id: '6752bac3197708a6cb64f717', iat: 1733475126, exp: 1733734326 }
                const user = await userModel.findById(decoded?.id);
                // console.log(user)
                req.user = user;
                next()

            }
        }catch(error){
            throw new Error("Not Authorized token expired, Please Login again");
        }
    } else {
        throw new Error("There is no token attached to header");
    }
});



// const authMiddleware = asyncHandler(async (req, res, next) => {
//     let token;

//     if (req?.headers?.authorization?.startsWith("Bearer")) {
//         token = req.headers.authorization.split(" ")[1];
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             const user = await userModel.findById(decoded?.id).select("-password");
            
//             if (!user) {
//                 res.status(401);
//                 throw new Error("User not found. Unauthorized.");
//             }

//             req.user = user;
//             next();
//         } catch (error) {
//             res.status(401);
//             throw new Error("Not authorized. Token expired or invalid.");
//         }
//     } else {
//         res.status(401);
//         throw new Error("No token provided. Authorization denied.");
//     }
// });


// Is Admin 
const isAdmin = asyncHandler(async(req,res,next)=>{
    // console.log(req.user)
    const {email} = req.user;
    const adminUser = await userModel.findOne({email});
    if(adminUser.role !=="admin") {
        throw new Error("You are not an admin")
    } else {
        next()
    }
});


const isVendor = asyncHandler(async(req, res, next) => {
    if (req.user.role !== "vendor") throw new Error("Not Authorized as Vendor");
    next();
});

const isDelivery = asyncHandler(async(req, res, next) => {
    if (req.user.role !== "delivery") throw new Error("Not Authorized as Delivery Man");
    next();
});



module.exports = {
    authMiddleware,
    isAdmin,
    isVendor,
    isDelivery
}