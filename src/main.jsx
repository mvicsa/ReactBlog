import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Contexts/ThemeContext.jsx'
import { LoadingProvider } from './Contexts/LoadingContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  </ThemeProvider>
)
