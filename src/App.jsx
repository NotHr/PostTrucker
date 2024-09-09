import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Components/Login/LoginPage'
import Dashboard from './Components/Dashboard/Dashboard'
import Consignment from './Components/Dashboard/DriverRegister'
import TruckTracking from './Components/Dashboard/TruckTracking'
import TruckDetails from './Components/Dashboard/TruckDetails'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/consignment' element={<Consignment/>}/>
        <Route path='/dashboard/trucks' element={<TruckTracking/>}/>
        <Route path='/dashboard/truckdetails' element={<TruckDetails/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App;
