// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
console.log("ppp");
export const handlers = [
  // // 添加通配符处理所有/mock开头的请求
  http.get("/mock/*", () => {
    console.log("[MSW] Mock request intercepted");
    return HttpResponse.json({  id: "abc-123", name: "John Maverick" }, { status: 200 });
  }),

  http.get("/mock/api/users", () => {
    console.log("Mock handler for /mock/api/users called");
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    }, { status: 200 });
  }),

  http.get("/mock/api/data", () => {
    return HttpResponse.json({ data: "success" });
  }),

  http.post("/mock/api/login", async ({ request }) => {
    const { username } = await request.json();
    return HttpResponse.json({ message: `Welcome, ${username}!` });
  }),
];
