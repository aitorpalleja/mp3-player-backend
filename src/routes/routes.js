import Express from "express";
const router = Express.Router();

import { getData } from "../controllers/getData.js";
import downloadVideo from "../controllers/downloadVideo.js"



router.get('/', (req, res) => {
  res.send('We are working fine');
});

router.get('/download', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Invalid URL');
  }

  try {
    await downloadVideo(url);
    res.send('Video downloaded successfully.');
  } catch (error) {
    res.status(500).send(`Error downloading video: ${error.message}`);
  }
});


router.get('/getData', async (req, res) => {
  try {
    const stats = await getData();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;