import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CurrencyProvider>
          <TransactionProvider>
            <App />
          </TransactionProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
