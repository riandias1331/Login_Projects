import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/loginsignup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
