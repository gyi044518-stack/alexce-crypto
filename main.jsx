import React from 'react'
import ReactDOM from 'react-dom/client'
// Use the firebase-enabled App implementation in src/
import App from './src/App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
