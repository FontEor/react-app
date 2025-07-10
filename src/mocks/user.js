// ✅ 正确导入方式（不需要 /native）
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    console.log(req,res,ctx)
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
    );
  }),

  rest.post('/api/login', (req, res, ctx) => {
    const { username } = req.body;
    return res(
      ctx.status(200),
      ctx.json({ message: `Welcome, ${username}!` })
    );
  })
];