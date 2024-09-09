import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Components/Login/loginPage'
import Dashboard from './Components/Dashboard/Dashboard'
import Consignment from './Components/Dashboard/Consignment'
import TruckTracking from './Components/Dashboard/TruckTracking'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/consignment' element={<Consignment/>}/>
        <Route path='/dashboard/truck' element={<TruckTracking/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App;
