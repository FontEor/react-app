
import axios from './axios';

export const authAPI = {
  // 登录
  login: (credentials) => axios.post('/auth/login', credentials),
  
  // 注册
  register: (userData) => axios.post('/auth/register', userData),
  
  // 获取当前用户信息
  getCurrentUser: () => axios.get('/auth/me'),
  
  // 刷新token
  refreshToken: () => axios.post('/auth/refresh'),
  
  // 登出
  logout: () => axios.post('/auth/logout'),
};