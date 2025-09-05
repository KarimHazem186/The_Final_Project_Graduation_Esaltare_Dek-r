const { generateToken } = require('../config/jwtToken');
const userModel =require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const validateMongoDbId = require("../utils/validateMongodbId")
const {generateRefreshToken} = require("../config/refreshToken")
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailControllers');

const uniqid = require('uniqid');


const createUser = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, ...rest } = req.body;
    const findUser = await userModel.findOne({ email });
  
    if (!findUser) {
      // Convert camelCase to schema format
      const newUser = await userModel.create({
        firstname: firstName,
        lastname: lastName,
        email,
        ...rest
      });
      res.json(newUser);
    } else {
      throw new Error("User Already Exists");
    }
  });
  

// // Login a User
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const findUser = await userModel.findOne({ email: email });

//     if (findUser && (await findUser.isPasswordMatched(password))) {
//         const refreshToken = await generateRefreshToken(findUser?._id);
//         await userModel.findByIdAndUpdate(
//             findUser.id,
//             { refreshToken: refreshToken },
//             { new: true }
//         );
        
//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             maxAge: 72 * 60 * 60 * 1000, // 3 days
//         });
        
//         res.json({
//             _id: findUser?.id,
//             firstname: findUser?.firstname,
//             lastname: findUser?.lastname,
//             email: findUser?.email,
//             mobile: findUser?.mobile,
//             token: generateToken(findUser?._id), // Access token
//         });
//     } else {
//         throw new Error("Invalid Credentials");
//     }
// });

// // Login an Admin
// const loginAdmin = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const findAdmin = await userModel.findOne({ email: email });

//     if (!findAdmin) {
//         throw new Error("Admin not found");
//     }

//     if (findAdmin.role !== 'admin') {
//         throw new Error("Not Authorized");
//     }

//     if (await findAdmin.isPasswordMatched(password)) {
//         const refreshToken = await generateRefreshToken(findAdmin?._id);

//         // Update admin with refresh token
//         await userModel.findByIdAndUpdate(
//             findAdmin.id,
//             { refreshToken: refreshToken },
//             { new: true }
//         );

//         // Set the refresh token as a cookie
//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             maxAge: 72 * 60 * 60 * 1000, // 3 days
//         });

//         res.json({
//             _id: findAdmin?.id,
//             firstname: findAdmin?.firstname,
//             lastname: findAdmin?.lastname,
//             email: findAdmin?.email,
//             mobile: findAdmin?.mobile,
//             token: generateToken(findAdmin?._id), // Access token
//         });
//     } else {
//         throw new Error("Invalid Credentials");
//     }
// });



// Login a User
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    // console.log(email,password);
    // check if user exists or not 
    const findUser = await userModel.findOne({email:email});
    if(findUser && (await findUser.isPasswordMatched(password))) {
        // res.json({
        //     findUser
        // });

        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateuser = await userModel.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken:refreshToken,
            },
            {new:true}
        );
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge:72 * 60 * 60 * 1000,
        });
        res.json({
            _id:findUser?.id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


// Login a Admin
const loginAdmin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    // console.log(email,password);
    // check if user exists or not 
    const findAdmin = await userModel.findOne({email:email});
    if(findAdmin.role !== 'admin') throw new Error("Not Authorized");
    if(findAdmin && (await findAdmin.isPasswordMatched(password))) {
        // res.json({
        //     findUser
        // });

        const refreshToken = await generateRefreshToken(findAdmin?._id)
        const updateAdmin = await userModel.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken:refreshToken,
            },
            {new:true}
        );
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge:72 * 60 * 60 * 1000,
        });
        res.json({
            _id:findAdmin?.id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email:findAdmin?.email,
            mobile:findAdmin?.mobile,
            token:generateToken(findAdmin?._id)
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


// Get all users
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const users = await userModel.find({ role: "user" }, { password: 0 }); // Exclude password field
        res.status(200).json(users); // Return all regular users
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch users." }); // Proper error handling
    }
});

// Get Single User
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Ensure the ID is valid

    try {
        const user = await userModel.findOne({ _id: id, role: "user" }, { password: 0 }); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found or not a regular user." });
        }
        res.status(200).json(user); // Return the found user
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user." }); // Proper error handling
    }
});

  
// handle refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
        return res.status(401).json({ message: "No Refresh Token in Cookies" });
    }

    const refreshToken = cookie.refreshToken;
    const user = await userModel.findOne({ refreshToken });

    if (!user) {
        return res.status(403).json({ message: "Refresh token not found or mismatched" });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const accessToken = generateToken(user._id);
        res.json({ accessToken });
    });
});


// Logout Functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
        return res.status(401).json({ message: "No Refresh Token in Cookies" });
    }

    const refreshToken = cookie.refreshToken;
    const user = await userModel.findOne({ refreshToken });

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true, // احذف secure لو تشتغل محلي بدون HTTPS
        });
        return res.sendStatus(204); // No Content
    }

    await userModel.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    res.sendStatus(204);
});


// save your address
const saveAddress = asyncHandler(async(req, res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id);

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch(error) {
        throw new Error(error);
    }
})


// Block User
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blockusr = await userModel.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true }
        );
        res.json({
            blockusr,
            message: "User Blocked",
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Unblock User
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const unblockusr = await userModel.findByIdAndUpdate(
            id,
            { isBlocked: false },
            { new: true }
        );
        res.json({
            unblockusr,
            message: "User Unblocked",
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;

    validateMongoDbId(_id);

    const user = await userModel.findById(_id);

    if (password) {
        user.password = password;
        const updatedUser = await user.save();
        return res.json({ message: "Password updated successfully", user: updatedUser });
    } else {
        return res.status(400).json({ message: "Password is required" });
    }
});

// // Forget Password Token 
const forgetPasswordToken = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await userModel.findOne({email});
    if(!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset your password. This link is valid for 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`;
        const data = {
            to:email,
            text:"Hey User",
            subject: "Forgot Password Link",
            html:resetURL
        };
        sendEmail(data)
        res.json(token)
    } catch (error) {
        throw new Error(error)
    }
});



const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    let { token } = req.params;

    token = token.trim(); // 🔥 Trim to remove newline or extra spaces

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(`Hashed Token: ${hashedToken}`);
    console.log(`Current Date: ${Date.now()}`);

    const user = await userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    console.log(`User found: ${user}`);

    if (!user) {
        console.log("User not found or token expired");
        return res.status(400).json({ message: "Token Expired, Please Try Again Later" });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful", user });
});



const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    try {
      const updatedData = {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        address: req?.body?.address,
      };
  
      const updatedUser = await userModel.findByIdAndUpdate(_id, updatedData, {
        new: true,
      });
  
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });
  

  // Delete User
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    // Validate the MongoDB ID (make sure it's a valid ObjectId)
    validateMongoDbId(id);

    try {
        // Attempt to find and delete the user by their ID
        const deleteUser = await userModel.findByIdAndDelete(id);

        if (!deleteUser) {
            // If the user was not found, return a 404 error
            return res.status(404).json({ message: "User not found" });
        }

        // Send a successful response with a message
        res.json({
            message: "User deleted successfully",
            user: deleteUser,
        });
    } catch (error) {
        // Catch any errors during the deletion process and send a 500 error
        res.status(500).json({
            message: "Error deleting user",
            error: error.message,
        });
    }
});


// const resetPassword = asyncHandler(async (req, res) => {
//     const { password } = req.body;
//     const { token } = req.params;

//     // Log request body to check if password is being received
//     console.log('Request Body:', req.body);

//     if (!password) {
//         return res.status(400).json({ message: "Password is required" });
//     }

//     // Hash the token to match it against the one in the DB
//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
// console.log("Hashed Token:", hashedToken);

// const user = await userModel.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
// });

// console.log("User found:", user);

    
//     // If no user found or token is invalid/expired
//     if (!user) {
//         return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     // Hash the new password before saving
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log('Hashed Password:', hashedPassword); // Log the hashed password

//         user.password = hashedPassword;

//         // Clear reset token and expiration time
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;

//         console.log("Before saving:", 'User object:', user); // Log user object before saving

//         await user.save();

//         console.log("After saving:", 'New password saved:', user.password); // Log after saving

//         res.status(200).json({ message: "Password reset successful" });
//     } catch (error) {
//         console.error("Error saving user:", error);
//         res.status(500).json({ message: "Error updating password" });
//     }
// });



// const updatedUser = asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     console.log(" updatedUser req.user ", req.user);
//     validateMongoDbId(_id);
//     try {
//         const updatedData = {
//             firstname: req?.body?.firstname,
//             lastname: req?.body?.lastname,
//             email: req?.body?.email,
//             mobile: req?.body?.mobile,
//             address: req?.body?.address || " " , // <-- Include address
//         };

//         if (req?.body?.password) {
//             const salt = await bcrypt.genSalt(10);
//             updatedData.password = await bcrypt.hash(req.body.password, salt);
//         }

//         const updatedUser = await userModel.findByIdAndUpdate(_id, updatedData, {
//             new: true,
//         });

//         res.json(updatedUser);
//     } catch (error) {
//         throw new Error(error);
//     }
// });


module.exports = {
    createUser,
    loginUser,
    loginAdmin,
    getAllUser,
    getUser,
    updatedUser,
    handleRefreshToken,
    logout,
    saveAddress,
    blockUser,
    unblockUser,
    updatePassword,
    forgetPasswordToken,
    resetPassword,
    deleteUser,

};

