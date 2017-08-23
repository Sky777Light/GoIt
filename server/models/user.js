const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    img: { type: String },
    markers: { type: [] },
    token: { type: String }
});


userSchema.methods.comparePassword =  function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save",  function(next) {
    if (this.isModified("password") || this.isNew) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);

    next();
});

module.exports = mongoose.model("User", userSchema);
