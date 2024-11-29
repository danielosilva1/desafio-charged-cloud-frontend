import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './app/(public)/login/Login.tsx'

// Define navegação entre telas
const router = createBrowserRouter([
	{
		path: '/',
		element: <App /> // Raiz direciona para App, que renderiza a tela Home
	},
	{
		path: '/login',
		element: <Login />
	}
]);


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</StrictMode>,
)
