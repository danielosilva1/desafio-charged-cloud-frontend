import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './app/(public)/home/Home';
import ControlPanel from './app/(authenticated)/control-panel/ControlPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Header from './app/components/header/Header';

const App: React.FC = () => {
	return (
		<>
		<BrowserRouter>
			<Layout>
				<Header />
			</Layout>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/control-panel' element={<ControlPanel />}></Route>
			</Routes>
		</BrowserRouter>
		</>
	)
}

export default App
