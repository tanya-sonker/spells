import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')
createRoot(root).render(<App />)

// Register a basic service worker for offline / PWA behavior
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('sw.js').catch((e) => console.warn('SW registration failed', e));
	});
}
