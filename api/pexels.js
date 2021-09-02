import axios from "axios";
import "../config";

export const getImages = async (searchTerm = "technology") =>
  await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
    headers: {
      Authorization: process.env.API_KEY,
    },
  });
