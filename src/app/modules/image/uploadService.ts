import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const IMGUR_API_URL = "https://api.imgur.com/3/image";
const IMGUR_CLIENT_ID = "Client-ID c8855cbec28058a";

export const uploadImageToImgur = async (imageBuffer: Buffer) => {
  const formData = new FormData();
  formData.append("image", imageBuffer);

  try {
    const response = await axios.post(IMGUR_API_URL, formData, {
      headers: {
        Authorization: IMGUR_CLIENT_ID,
      },
    });

    return { response, result: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data || error.message || "Unknown error occurred";
    return { response: error.response, result: { error: errorMessage } };
  }
};
