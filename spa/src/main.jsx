import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AuthProvider, { AuthMixin } from './Providers/AuthContext/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <AuthMixin>
          <App />
        </AuthMixin>
      </AuthProvider>
    </BrowserRouter>
  </>
    
)
