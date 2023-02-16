import Mongoose from "mongoose"
import { Creator } from "./creatorsModel";

const VideoSchema = new Mongoose.Schema({
    creatorId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Creator",
        required: true
    },
    videoTitle: {
        type: String,
        required: true
    },
    videoThumbail: {
        type: String,
        required: true
    },
    publishData: {
        type: Date,
        required: true
    },
    trancribedText: {
        type: String,
        required: true
    }

});

const Video = Mongoose.model("Video", VideoSchema);

export {Creator, Video} ;