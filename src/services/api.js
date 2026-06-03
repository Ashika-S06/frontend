import API from '../utils/axios';

// Auth
export const loginAPI = (data) => API.post('/auth/login', data);
export const registerAPI = (data) => API.post('/auth/register', data);
export const getMeAPI = () => API.get('/auth/me');

// Students
export const getStudentsAPI = (params) => API.get('/students', { params });
export const getStudentByIdAPI = (id) => API.get(`/students/${id}`);

// Companies
export const getCompaniesAPI = (params) => API.get('/companies', { params });
export const getCompanyByIdAPI = (id) => API.get(`/companies/${id}`);
export const createCompanyAPI = (data) => API.post('/companies', data);
export const updateCompanyAPI = (id, data) => API.patch(`/companies/${id}`, data);
export const deleteCompanyAPI = (id) => API.delete(`/companies/${id}`);

// Drives
export const getDrivesAPI = (params) => API.get('/drives', { params });
export const getDriveByIdAPI = (id) => API.get(`/drives/${id}`);
export const createDriveAPI = (data) => API.post('/drives', data);
export const updateDriveAPI = (id, data) => API.patch(`/drives/${id}`, data);
export const deleteDriveAPI = (id) => API.delete(`/drives/${id}`);

// Applications
export const getApplicationsAPI = (params) => API.get('/applications', { params });
export const getApplicationByIdAPI = (id) => API.get(`/applications/${id}`);
export const createApplicationAPI = (data) => API.post('/applications', data);
export const updateApplicationAPI = (id, data) => API.patch(`/applications/${id}`, data);
export const deleteApplicationAPI = (id) => API.delete(`/applications/${id}`);

// Analytics
export const getPlacementAnalyticsAPI = () => API.get('/analytics/placements');
export const getDepartmentAnalyticsAPI = () => API.get('/analytics/departments');
export const getCompanyAnalyticsAPI = () => API.get('/analytics/companies');

// Interviews
export const getInterviewsAPI = () => API.get('/interviews');
export const scheduleInterviewAPI = (data) => API.post('/interviews', data);
export const updateInterviewAPI = (id, data) => API.patch(`/interviews/${id}`, data);
