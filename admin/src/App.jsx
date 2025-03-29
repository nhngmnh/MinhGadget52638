import { AdminContext } from "./context/AdminContext"
import { Router,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import { useContext } from "react"
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  const {aToken}=useContext(AdminContext)
  return aToken ? (
    <div className='bg-gray-200'>
       <ToastContainer/>
       <Navbar/>
       <div className='flex items-start '>
        <Sidebar/>
        <Routes>
          {/*ad route*/}
            <Route path='/' element={<></>}/>
           
        </Routes>
       </div>
    </div>
  ) : (
    <><Login/>
       <ToastContainer/>
       </>
  )
}

export default App