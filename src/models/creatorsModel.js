import Mongoose from "mongoose"

const CreatorsSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

const Creator = Mongoose.model("Creator", CreatorsSchema);

export {Creator};