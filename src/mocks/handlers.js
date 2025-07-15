import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/mock/api/users", () => {
    return HttpResponse.json(
      {
        id: "abc-123",
        firstName: "John",
        lastName: "Maverick",
      },
      { status: 200 }
    );
  }),

  http.get("/mock/api/data", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: "success" }));
  }),

  http.post("/mock/api/login", (req, res, ctx) => {
    const { username } = req.body;
    return res(ctx.status(200), ctx.json({ message: `Welcome, ${username}!` }));
  }),
];
