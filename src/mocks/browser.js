import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
export const worker = setupWorker(...handlers);


// 添加调试输出
worker.events.on('request:start', ({ request }) => {
  console.log('[MSW] Intercepted:', request.method, request.url)
})

worker.events.on('request:match', ({ request }) => {
  console.log('[MSW] Matched:', request.method, request.url)
})

worker.events.on('request:unhandled', ({ request }) => {
  console.warn('[MSW] Unhandled:', request.method, request.url)
})