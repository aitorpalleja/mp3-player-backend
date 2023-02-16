import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';
import transcribeLocalAudio from './transcribeLocalAudio.js'

async function downloadAudio(url) {
  try {
    const videoInfo = await ytdl.getInfo(url)
    const videoId = videoInfo.videoDetails.videoId;
    const fileName = `${videoId}.mp3`;

    const audioStream = ytdl(url, { filter: 'audioonly' });
    const outputStream = createWriteStream(fileName);

    await new Promise((resolve, reject) => {
      audioStream.pipe(outputStream);
      outputStream.on('finish', resolve);
      outputStream.on('error', reject);
    });

    console.log('Audio downloaded successfully.');
    console.log('Title:', videoInfo.videoDetails.title);
    console.log('Thumbnail:', videoInfo.videoDetails.thumbnails[0].url);
    console.log('Channel:', videoInfo.videoDetails.author.name);

    transcribeLocalAudio(fileName)
    
  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

downloadAudio('https://www.youtube.com/watch?v=v7OlF2AbBM8&ab_channel=afordigital');

