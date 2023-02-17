import Song from '../models/songModel.js';
import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';
import fs from 'fs/promises';
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

    const fileBuffer = await fs.readFile(fileName);
    await fs.unlink(fileName);

    const videoData = new Song({
      channelName: videoInfo.videoDetails.author.name,
      channelAvatar: videoInfo.videoDetails.author.thumbnails[0].url,
      songTitle: videoInfo.videoDetails.title,
      songThumbnail: videoInfo.videoDetails.thumbnails[0].url,
      publishData: videoInfo.videoDetails.publishDate,
      songData: fileBuffer,
      songDuration: videoInfo.videoDetails.lengthSeconds

    });

    await videoData.save();
    console.log('Video data stored in MongoDB.');
  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

export default downloadVideo;