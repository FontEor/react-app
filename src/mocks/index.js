// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './user.js';

export const worker = setupWorker(...handlers);