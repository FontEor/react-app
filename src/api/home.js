// src/api/endpoints/posts.js
import axios from './axios';

export const postsAPI = {
  // 获取文章列表
  getPosts: (params) => axios.get('/posts', { params }),
  
  // 获取单篇文章
  getPostById: (id) => axios.get(`/posts/${id}`),
  
  // 创建文章
  createPost: (postData) => axios.post('/posts', postData),
  
  // 更新文章
  updatePost: (id, postData) => axios.put(`/posts/${id}`, postData),
  
  // 删除文章
  deletePost: (id) => axios.delete(`/posts/${id}`),
  
  // 点赞文章
  likePost: (id) => axios.post(`/posts/${id}/like`),
};