import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './app/(public)/home/Home';
import ControlPanel from './app/(authenticated)/control-panel/ControlPanel';
import CreateCompany from './app/(authenticated)/register-company/RegisterCompany';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Header from './app/components/header/Header';
import GetCompanies from './app/(authenticated)/get-companies/GetCompanies';
import UpdateCompany from './app/(authenticated)/update-company/UpdateCompany';
import RegisterAddress from './app/(authenticated)/register-address/RegisterAddress';

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
					<Route path='/register-company' element={<CreateCompany />}></Route>
					<Route path='/get-companies' element={<GetCompanies />}></Route>
					<Route path='/update-company' element={<UpdateCompany />}></Route>
					<Route path='/register-address' element={<RegisterAddress />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
