import Song from '../models/songModel.js';
import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import { promisify } from 'util';
import { pipeline } from 'stream';

const pipelineAsync = promisify(pipeline);

async function downloadVideo(url) {
  try {
    const videoInfo = await ytdl.getInfo(url);
    const videoId = videoInfo.videoDetails.videoId;
    const fileName = `${videoId}.mp3`;

    const audioStream = ytdl(url, { filter: 'audioonly' });
    const fileWriteStream = createWriteStream(fileName);
    await pipelineAsync(audioStream, fileWriteStream);

    const cloudinaryUpload = await cloudinary.v2.uploader.upload(fileName, { resource_type: "auto", folder: "audio" });
    
    // Delete file from local
    await fs.unlink(fileName);

    const songData = cloudinaryUpload.url;

    const thumbnail = videoInfo.videoDetails.thumbnails.sort((a, b) => b.width - a.width)[0];

    const videoData = new Song({
      channelName: videoInfo.videoDetails.author.name,
      channelAvatar: videoInfo.videoDetails.author.thumbnails[0].url,
      songTitle: videoInfo.videoDetails.title,
      songThumbnail: thumbnail.url,
      publishData: videoInfo.videoDetails.publishDate,
      songData: songData, 
      songDuration: videoInfo.videoDetails.lengthSeconds

    });

    await videoData.save();
    console.log('Video data stored in MongoDB.');
  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

export default downloadVideo;
