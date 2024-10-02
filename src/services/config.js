import axios from "axios";
const token = JSON.parse(localStorage.getItem("accessToken"));
export const http = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  timeout: 30000,
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OCIsIkhldEhhblN0cmluZyI6IjE1LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjg5OTIwMDAwMCIsIm5iZiI6MTcwOTEzOTYwMCwiZXhwIjoxNzM3MDQ2ODAwfQ.15h8Zu___NIMHyUdFGA_OXmW8LeIiC8dEKnAv1v362Q",
    Authorization: `Bearer ${token}`,
  },
});
