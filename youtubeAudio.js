import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';

async function downloadAudio(url, fileName) {
  try {
    const audioStream = ytdl(url, { filter: 'audioonly' });
    const outputStream = createWriteStream(fileName);

    await new Promise((resolve, reject) => {
      audioStream.pipe(outputStream);
      outputStream.on('finish', resolve);
      outputStream.on('error', reject);
    });

    console.log('Audio downloaded successfully.');
  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

downloadAudio('https://www.youtube.com/shorts/Q8SX7gaA-wI', 'audio.mp3');
