import axiosInstance from "./axiosInstance";

export const sendMessage = async (username, data) => {
  const response = await axiosInstance.post(`/api/messages/${username}`, data);
  return response.data;
};

export const getMessages = async () => {
  const response = await axiosInstance.get("/api/messages");
  return response.data;
};