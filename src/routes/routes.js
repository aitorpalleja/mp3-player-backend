import Express from "express";
const router = Express.Router();

router.get('/', (req, res) => {
  res.send('We are working fine');
});


export default router;