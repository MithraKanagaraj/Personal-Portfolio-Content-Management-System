import axiosInstance from "./axiosInstance";

export const addCertification = async (data) => {
  const response = await axiosInstance.post("/api/certifications", data);
  return response.data;
};

export const getCertifications = async () => {
  const response = await axiosInstance.get("/api/certifications");
  return response.data;
};

export const deleteCertification = async (id) => {
  const response = await axiosInstance.delete(`/api/certifications/${id}`);
  return response.data;
};
