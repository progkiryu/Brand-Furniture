//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // uncommenting this line renders components twice
  //<StrictMode>
    <App />
  //</StrictMode>,
)
