// axios.ts
import axios from 'axios';
import { Order, Specimen, Submitter, Patient } from '../types/api'; // Adjust imports as needed
import { BASE_URL, API_PATH } from './appRoutes';
import { getToken } from './auth';

// Create an instance of axios with base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to headers if available
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    console.log("Token found:", token);  // Debugging log
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn("No token found, request might be unauthorized.");
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor to handle responses and errors
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    console.error("Unauthorized: Token may be invalid or expired.");
    // Optionally, redirect to login or attempt to refresh the token here
  }
  return Promise.reject(error);
});

// Fetch Orders
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get(API_PATH.ORDERS);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow error to handle it in the component
  }
};


// Fetch Specimens by Order Code
export const fetchSpecimensByOrderCode = async (orderCode: string): Promise<Specimen[]> => {
  try {
    const response = await api.get(`${API_PATH.SPECIMENS}?orderCode=${orderCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching specimens for order code ${orderCode}:`, error);
    throw error;
  }
};

// Post Order
export const postOrder = async (order: Order) => {
  try {
    const response = await api.post(API_PATH.ORDERS, order);
    return response.data;
  } catch (error) {
    console.error("Error posting order:", error);
    throw error;
  }
};

// Post Specimen
export const postSpecimen = async (specimen: Specimen) => {
  try {
    const response = await api.post(API_PATH.SPECIMENS, specimen);
    return response.data;
  } catch (error) {
    console.error("Error posting specimen:", error);
    throw error;
  }
};

// Post Submission
export const postSubmission = async (submitter: Submitter) => {
  try {
    const response = await api.post(API_PATH.SUBMISSIONS, submitter);
    return response.data;
  } catch (error) {
    console.error("Error posting submission:", error);
    throw error;
  }
};

// Post Patient
export const postPatient = async (patient: Patient) => {
  try {
    const response = await api.post(API_PATH.PATIENTS, patient);
    return response.data;
  } catch (error) {
    console.error("Error posting patient:", error);
    throw error;
  }
};

// Fetch Dropdown Data
export const fetchDropdownData = async (type: keyof typeof API_PATH): Promise<any[]> => {
  try {
    const response = await api.get(API_PATH[type]);
    return response.data;
  } catch (error) {
    console.error(`Error fetching dropdown data for type ${type}:`, error);
    throw error;  // Re-throwing the error to be handled by the caller
  }
};

export default api;
