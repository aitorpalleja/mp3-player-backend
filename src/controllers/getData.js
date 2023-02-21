import TopicData from '../models/songModel.js'

export const getData = async () => {
  try {
    const stats = await TopicData.find({});
    return stats;
  } catch (err) {
    throw new Error(err.message);
  }
}; 