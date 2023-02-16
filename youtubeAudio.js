import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';

async function downloadAudio(url, fileName) {
  try {
    const videoInfo = await ytdl.getInfo(url)
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


  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

downloadAudio('https://www.youtube.com/shorts/_N8gl2blfsc', 'audio.mp3');
