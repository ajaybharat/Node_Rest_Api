const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'index',
        required: true
    }
},
{ timestamps: true });

const PostModel = mongoose.model("PostModel", PostSchema);

module.exports = PostModel;