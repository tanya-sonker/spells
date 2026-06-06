import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const url = new URL(window.location.href)
const path = url.searchParams.get('path')
if (path) {
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = base.replace(/\/$/, '') + path
  window.history.replaceState(null, '', cleanPath)
}

const root = document.getElementById('root')
createRoot(root).render(<App />)

// Register a basic service worker for offline / PWA behavior
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('sw.js').catch((e) => console.warn('SW registration failed', e));
	});
}
