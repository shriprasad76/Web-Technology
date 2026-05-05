import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function loginUser(credentials) {
  const response = await api.post('/auth/login', credentials);
  setAuthToken(response.data.token);
  return response.data;
}

export async function registerUser(data) {
  const response = await api.post('/auth/register', data);
  setAuthToken(response.data.token);
  return response.data;
}

export async function fetchAdminData(path) {
  const response = await api.get(`/admin/${path}`);
  return response.data;
}

export async function createAdminData(path, payload) {
  const response = await api.post(`/admin/${path}`, payload);
  return response.data;
}

export async function createLab(payload) {
  const response = await api.post('/faculty/labs', payload);
  return response.data;
}

export async function fetchLabs() {
  const response = await api.get('/faculty/labs');
  return response.data;
}

export async function fetchSubjects() {
  const response = await api.get('/faculty/subjects');
  return response.data;
}

export async function fetchBatches() {
  const response = await api.get('/faculty/batches');
  return response.data;
}

export async function fetchLabStudents(labId) {
  const response = await api.get(`/faculty/labs/${labId}/students`);
  return response.data;
}

export async function fetchLabResults(labId) {
  const response = await api.get(`/faculty/labs/${labId}/results`);
  return response.data;
}

export async function createPractical(payload) {
  const response = await api.post('/faculty/practicals', payload);
  return response.data;
}

export async function submitEvaluation(payload) {
  const response = await api.post('/faculty/evaluations', payload);
  return response.data;
}

export async function fetchResults() {
  const response = await api.get('/student/results');
  return response.data;
}
