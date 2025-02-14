const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    otp: { type: String },
        verified: { type: Boolean, default: false },
        fcmToken: { type: String }
    },
    { timestamps: true }
);

serviceProviderSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
module.exports = mongoose.model('Service_Provider', serviceProviderSchema);

