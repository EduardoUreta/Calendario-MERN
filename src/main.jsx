import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { CalendarAPP } from './CalendarAPP.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarAPP/>
  </StrictMode>,
)
