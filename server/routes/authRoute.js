const express = require('express');
const router = express.Router();
const usercontrollers = require("../controllers/userControllers");
const { authMiddleware , isAdmin } = require('../middlewares/authMiddleware');

router.post("/register",usercontrollers.createUser);

router.post("/forgot-password-token",usercontrollers.forgetPasswordToken);
router.put("/reset-password/:token",usercontrollers.resetPassword);
router.put("/update-password",authMiddleware,usercontrollers.updatePassword);

router.post("/login",usercontrollers.loginUser);
router.post("/admin-login",usercontrollers.loginAdmin);
router.put("/save-address",authMiddleware,usercontrollers.saveAddress);
router.get("/all-users",usercontrollers.getAllUser);

router.get("/refresh",usercontrollers.handleRefreshToken);
// router.get("/logout",usercontrollers.logout);

router.post("/refresh", usercontrollers.handleRefreshToken);
router.post("/logout", usercontrollers.logout);
router.get("/get-user/:id",authMiddleware,isAdmin,usercontrollers.getUser);


router.put('/update-user', authMiddleware, usercontrollers.updatedUser);


router.put("/block-user/:id",authMiddleware,isAdmin,usercontrollers.blockUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin,usercontrollers.unblockUser);

router.delete("/delete-user/:id",authMiddleware,isAdmin,usercontrollers.deleteUser);


module.exports =router;