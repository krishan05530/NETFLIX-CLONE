import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
     {/* as react redner twice during developemnt mode  */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  
  </StrictMode> 
)


// npm run build  to start it , as it will install node module 
// npm run start as we are in production  
