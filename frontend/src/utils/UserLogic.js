import axios from "axios";

export const getUser = (setUserDetail) => {
  const instance = axios.create({
    withCredentials: true,
  });

  instance
    .get("http://localhost:4000/api/v1/me")
    .then((res) => {
      setUserDetail(res.data.user);
    })
    .catch((e) => {
      console.log(e.message);
    });
};
