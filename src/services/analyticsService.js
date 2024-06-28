// services/analyticsService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // JSON Server 的地址

// 记录访问某个页面路径
export const recordPageVisit = (path) => {
    return axios.post(`${API_BASE_URL}/visits`, { path });
};

// 获取特定页面路径的访问量信息
export const getPageVisits = (path) => {
    return axios.get(`${API_BASE_URL}/visits?path=${path}`);
};
