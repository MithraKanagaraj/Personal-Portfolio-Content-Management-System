import axiosInstance from "./axiosInstance";

export const addSkill = async (data) => {
  const response = await axiosInstance.post("/api/skills", data);
  return response.data;
};

export const getSkills = async () => {
  const response = await axiosInstance.get("/api/skills");
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await axiosInstance.delete(`/api/skills/${id}`);
  return response.data;
};