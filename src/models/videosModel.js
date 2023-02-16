import Mongoose from "mongoose"

const VideoSchema = new Mongoose.Schema({
    channelName: {
        type: String,
        required: true
    },
    channelAvatar: {
        type: String,
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
    transcribedText: {
        type: String,
        required: false
    }

});

const Video = Mongoose.model("Video", VideoSchema);

export default Video;