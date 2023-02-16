import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';

ytdl('https://www.youtube.com/watch?v=lq0O1L-7fBo&ab_channel=afordigital', { filter: 'audioonly' })
    .pipe(createWriteStream('audio.mp3'));
