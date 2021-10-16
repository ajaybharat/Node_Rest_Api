const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: []
    },
    followins: {
        type: Array,
        default: []
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }]
},
{ timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;