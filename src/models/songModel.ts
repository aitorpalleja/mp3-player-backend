import { Schema, model } from 'mongoose'
import { SongTypes } from 'types/song.types'

const SongSchema = new Schema<SongTypes.Song>({
	songTitle: {
		type: String,
		required: true,
	},
	songThumbnail: {
		type: String,
		required: true,
	},
	songData: {
		type: String,
		required: true,
	},
	songDuration: {
		type: Number,
		required: true,
	},
	publishData: {
		type: String,
		required: true,
	},
})

const Song = model('Song', SongSchema)

export default Song
