import axiosInstance from "./axiosInstance";

export const addExperience = async (data) => {
  const response = await axiosInstance.post("/api/experiences", data);
  return response.data;
};

export const getExperiences = async () => {
  const response = await axiosInstance.get("/api/experiences");
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await axiosInstance.delete(`/api/experiences/${id}`);
  return response.data;
};
