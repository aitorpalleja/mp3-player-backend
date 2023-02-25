import express from 'express'
import { getSongs, uploadSong, uploadYoutubeSong } from 'controllers/song.controller'

const router = express.Router()

router.get('/', getSongs)
router.post('/upload/youtube', uploadYoutubeSong)
router.post('/upload', uploadSong)

export default router
