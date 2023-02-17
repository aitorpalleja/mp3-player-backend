import Song from '../models/songModel.js';
import ytdl from 'ytdl-core';

async function saveVideoInfo(url) {
  try {
    const videoInfo = await ytdl.getInfo(url);

    const videoData = new Song({
      channelName: videoInfo.videoDetails.author.name,
      channelAvatar: videoInfo.videoDetails.author.thumbnails[0].url,
      songTitle: videoInfo.videoDetails.title,
      songThumbnail: videoInfo.videoDetails.thumbnails[0].url,
      publishData: videoInfo.videoDetails.publishDate,
      songId: videoInfo.videoDetails.videoId,
      songDuration: videoInfo.videoDetails.lengthSeconds
    });

    await videoData.save();
    console.log('Video data stored in MongoDB.');
  } catch (error) {
    console.error('Error saving video data:', error);
  }
}

export default saveVideoInfo;
