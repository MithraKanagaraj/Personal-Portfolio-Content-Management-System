import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/api/profile/me");
  return response.data;
};

export const saveProfile = async (data) => {
  const response = await axiosInstance.post("/api/profile/save", data);
  return response.data;
};
