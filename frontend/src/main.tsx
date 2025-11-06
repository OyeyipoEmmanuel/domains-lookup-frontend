import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LetterLengthProvider } from './context/LetterLengthContext.tsx'

const queryCLient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryCLient}>
    <StrictMode>
      <LetterLengthProvider>
        <App />
      </LetterLengthProvider>
    </StrictMode>
  </QueryClientProvider>,
)
