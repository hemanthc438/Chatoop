import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/SignUp';
const router  = createBrowserRouter([
  {
    path:'/',
    element:<Login/>,
    errorElement:<ErrorPage/>
  },{
    path:'/home',
    element:<Home/>
  },{
    path:'signup',
    element:<SignUp/>
  }
])

function App() {
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
