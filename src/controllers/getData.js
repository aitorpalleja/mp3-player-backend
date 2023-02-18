import TopicData from '../models/songModel.js'

export const getData = async (req, res) => {
  try {
    const stats = await TopicData.find({});
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};