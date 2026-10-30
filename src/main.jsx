import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/soho-light/theme.css'
// import 'primereact/resources/themes/md-dark-deeppurple/theme.css'
// import 'primereact/resources/themes/lara-light-pink/theme.css'
import 'primeicons/primeicons.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
)

