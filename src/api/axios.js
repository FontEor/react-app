import axios from 'axios';
import { getToken, clearToken } from './auth';

// 创建 axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:80',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 存储待处理的请求
const pendingRequests = new Map();

/**
 * 生成请求唯一键
 */
function generateRequestKey(config) {
  return `${config.method}-${config.url}`;
}

/**
 * 添加请求到待处理列表
 */
function addPendingRequest(config) {
  const key = generateRequestKey(config);
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(key, controller);
}

/**
 * 移除待处理请求
 */
function removePendingRequest(config) {
  const key = generateRequestKey(config);
  pendingRequests.delete(key);
}

/**
 * 取消重复请求
 */
function cancelPendingRequest(config) {
  const key = generateRequestKey(config);
  if (pendingRequests.has(key)) {
    pendingRequests.get(key).abort('取消重复请求');
    pendingRequests.delete(key);
  }
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 取消重复请求
    cancelPendingRequest(config);
    // 添加当前请求到待处理列表
    addPendingRequest(config);
    
    // 添加认证令牌
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 请求完成，从待处理列表中移除
    removePendingRequest(response.config);
    
    // 处理业务响应
    if (response.data && response.data.code === 200) {
      return response.data.data;
    }
    
    const error = new Error(response.data?.message || '请求失败');
    error.response = response;
    return Promise.reject(error);
  },
  (error) => {
    const config = error.config;
    
    // 请求完成，从待处理列表中移除
    if (config) {
      removePendingRequest(config);
    }
    
    // 请求被取消
    if (axios.isCancel(error)) {
      error.isCanceled = true;
      return Promise.reject(error);
    }
    
    // 处理HTTP错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          clearToken();
          window.location.href = '/login';
          break;
        case 403:
          // 处理权限不足
          break;
        case 404:
          // 处理资源不存在
          break;
        case 500:
          // 处理服务器错误
          break;
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * 带自动重试的请求方法
 */
async function requestWithRetry(config, maxRetry = 3, retryDelay = 1000) {
  try {
    return await instance.request(config);
  } catch (error) {
    const cfg = error.config || config;
    // 不可重试的错误
    if (error.isCanceled || !cfg.isRetryable || maxRetry <= 0) {
      throw error;
    }
    // 延迟后重试
    await new Promise(resolve => setTimeout(resolve, retryDelay));
    return requestWithRetry(cfg, maxRetry - 1, retryDelay);
  }
}

// 扩展实例方法
instance.requestWithRetry = requestWithRetry;

export default instance;