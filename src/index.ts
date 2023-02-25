import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import 'module-alias/register'
import Express from 'express'
import Mongoose from 'mongoose'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'

import routes from 'routes/routes'

const launch = async () => {
	try {
		const app = Express()
		const port = process.env.PORT || 3001
		const mongodbRoute = process.env.MONGO_DB_URI!

		await Mongoose.connect(mongodbRoute)
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		})

		app.use(Express.urlencoded({ extended: false }))
		app.use(Express.json({ limit: '20mb' }))
		app.use(cors({
			origin: '*',
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			allowedHeaders: ['Content-Type'],
		}))

		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`)
		})

		app.use('/api/song', routes)
	} catch (error) {
		console.log(error)
	}
}

launch()
