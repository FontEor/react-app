// src/api/axios.js
import axios from 'axios';
import { getToken, clearToken } from './auth';

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从本地存储获取token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 可以在这里添加其他请求前的逻辑
    // 如添加时间戳、签名等
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做统一处理
    if (response.data && response.data.code === 200) {
      return response.data.data; // 返回实际业务数据
    }
    return Promise.reject(response.data.message || '请求失败');
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 处理未授权
          clearToken();
          window.location.href = '/login';
          break;
        case 403:
          // 处理禁止访问
          break;
        case 404:
          // 处理资源不存在
          break;
        case 500:
          // 处理服务器错误
          break;
        default:
          break;
      }
    }
    
    // 返回错误信息
    return Promise.reject(error.response?.data?.message || error.message || '网络错误');
  }
);

export default instance;