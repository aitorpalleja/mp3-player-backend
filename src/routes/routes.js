import Express from "express";
const router = Express.Router();

import { getData } from "../controllers/getData.js";

router.get('/', (req, res) => {
  res.send('We are working fine');
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