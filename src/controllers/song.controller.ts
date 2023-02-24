import { Request, Response } from 'express'
import ytdl from 'ytdl-core'
import fs, { createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { v2 as cloudinary } from 'cloudinary'
import Song from 'models/songModel'
import { SongTypes } from 'types/song.types'

export const getSongs = async (req: Request, res: Response) => {
	try {
		const songs = await Song.find()
		res.status(200).send({ songs })
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' })
	}
}

export const uploadYoutubeSong = async (req: Request, res: Response) => {
	try {
		const url = req.query.url as string | undefined
		if (!url) {
			return res.status(400).send('Invalid URL')
		}

		const videoInfo = await ytdl.getInfo(url)
		const videoId = videoInfo.videoDetails.videoId
		const fileName = `${videoId}.mp3`

		const audioStream = ytdl(url, { filter: 'audioonly' })
		const fileWriteStream = createWriteStream(fileName)

		const pipelineAsync = promisify(pipeline)
		await pipelineAsync(audioStream, fileWriteStream)

		const { url: songData } = await cloudinary.uploader.upload(fileName, { resource_type: 'video', folder: 'audio' })

		// Delete file from local
		const deleteFile = promisify(fs.unlink)
		await deleteFile(fileName)

		const thumbnail = videoInfo.videoDetails.thumbnails.sort((a, b) => b.width - a.width)[0]

		const song = await Song.create({
			songTitle: videoInfo.videoDetails.title,
			songThumbnail: thumbnail.url,
			songAuthor: videoInfo.videoDetails.author.name,
			publishData: videoInfo.videoDetails.publishDate,
			songDuration: videoInfo.videoDetails.lengthSeconds,
			songData,
		})

		res.status(201).send({ song })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Something went wrong' })
	}
}

export const uploadSong = async (req: Request, res: Response) => {
	try {
		const {
			songTitle: title,
			songExtension,
			songThumbnail,
			songAuthor,
			songData,
			songDuration,
			publishData,
		} = req.body as Required<SongTypes.Song>

		const songTitle = title + songExtension
		const { url } = await cloudinary.uploader.upload(songData, {
			filename_override: songTitle,
			resource_type: 'video',
			folder: 'audio',
		})

		const song = await Song.create({
			songTitle,
			songThumbnail,
			songAuthor,
			songData: url,
			songDuration,
			publishData,
		})

		res.status(201).send({ song })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Something went wrong' })
	}
}
