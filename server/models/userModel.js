const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
const crypto = require('crypto')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin','vendor'],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: [],
    },
    // address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    address:{
        type: String,
        default: "",
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true,
});


// Hashed password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
userSchema.methods.isPasswordMatched = async function (enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
};
userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex"); // 1. Create a random reset token
    
    // 2. Save a safe (hashed) version in the database
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resettoken)
        .digest("hex");
    
    // 3. Set when it expires
    const expirationTime = Date.now() + 30 * 60 * 1000;  // 30 minutes
    this.passwordResetExpires = new Date(expirationTime);

    return resettoken; // Return the plain reset token
};

//Export the model
module.exports = mongoose.model('User', userSchema);


/*

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const crypto = require('crypto');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor', 'delivery'],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: [],
    },
    address: {
        type: String,
        default: "",
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    // OPTIONAL: for vendors or delivery men
    vendorDetails: {
        type: mongoose.Schema.Types.Mixed, // or define a sub-schema
        default: null,
    },
    deliveryZone: {
        type: String,
        default: null,
    },

}, {
    timestamps: true,
});

// Hashed password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.isPasswordMatched = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resettoken)
        .digest("hex");

    this.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    return resettoken;
};

module.exports = mongoose.model('User', userSchema);

*/