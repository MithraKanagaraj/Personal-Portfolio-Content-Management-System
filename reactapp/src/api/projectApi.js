import axiosInstance from "./axiosInstance";

export const addProject = async (data) => {
  const response = await axiosInstance.post("/api/projects", data);
  return response.data;
};

export const getProjects = async () => {
  const response = await axiosInstance.get("/api/projects");
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axiosInstance.delete(`/api/projects/${id}`);
  return response.data;
};