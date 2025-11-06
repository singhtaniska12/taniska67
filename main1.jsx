import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import Count from './count.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Count/>
  </StrictMode>,
)