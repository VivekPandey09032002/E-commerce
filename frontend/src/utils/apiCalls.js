import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fzc5s9qa");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/di2i37eww/image/upload",
      formData
    );
    const public_id = res.data.public_id;
    const url = res.data.secure_url;
    return { public_id, url };
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const registerUser = (url, data, options, success, error) => {
  axios
    .post(url,data,options)
    .then((res, success) => {

    })
    .catch((err, error) => {
      
    });
};
