# Instalación

1 - Crear proyecto con Vite: npm create vite@latest

2 - Instalar react router dom: npm i react-router-dom

# Estructura de proyecto
- Carpeta Auth y Calendar, con sus pages y componentes
- Router con AppRouter y sus Routes

# Instalaciones adicionales
- npm i react-big-calendar date-fns
- npm i react-datepicker
- npm i sweetalert2

# Redux Toolkit
- npm install react-redux
- npm install @reduxjs/toolkit
- Crear store.js
- Crear carpeta store/ui & calendar con su slice (redux-slice)
- Usar store con Provider en el punto más alto (BrowserRouter) Provider store={store}