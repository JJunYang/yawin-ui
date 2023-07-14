import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  // 根可用于将 React 元素渲染到 DOM 中
  root.render(<App />);
} else {
}
