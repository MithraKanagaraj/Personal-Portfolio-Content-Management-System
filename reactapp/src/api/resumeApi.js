import axiosInstance from "./axiosInstance";

export const saveResume = async (data) => {
  const response = await axiosInstance.post("/api/resume", data);
  return response.data;
};

export const getResume = async () => {
  const response = await axiosInstance.get("/api/resume");
  return response.data;
};