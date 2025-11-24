import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

export const authApi = {
  sendOtp: (phone: string) => api.post('/auth/send-otp', { phone }),
  verifyOtp: (phone: string, code: string) => api.post('/auth/verify-otp', { phone, code }),
  signup: (name: string, phone: string, role: string) => api.post('/auth/signup', { name, phone, role })
};

export const jobApi = {
  postJob: (job: any) => api.post('/jobs', job),
  getJobsByCustomer: (customerId: string) => api.get(`/jobs/customer/${customerId}`)
};

export const walletApi = {
  getWallet: (userId: string) => api.get(`/wallet/${userId}`),
  rechargeWallet: (userId: string, amount: number) => api.post('/wallet/recharge', { userId, amount })
};
