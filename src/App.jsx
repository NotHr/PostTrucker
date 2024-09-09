import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from "./Components/Login/LoginPage"
import Dashboard from './Components/Dashboard/Dashboard'
import Consignment from './Components/Dashboard/Consignment'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/consignment' element={<Consignment/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App;
