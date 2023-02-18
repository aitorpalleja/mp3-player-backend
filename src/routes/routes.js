import Express from "express";
const router = Express.Router();

import downloadVideo from '../controllers/downloadVideo.js';


router.get('/', (req, res) => {
  res.send('We are working fine');
});

router.get('/download', async (req, res) => {
  try {
    const { url } = req.query;
    await downloadVideo(url);
    res.send('Video downloaded successfully.');
  } catch (error) {
    res.status(500).send(`Error downloading video: ${error.message}`);
  }
});


export default router;