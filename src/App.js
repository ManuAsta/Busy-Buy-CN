//styling
import './App.css';
//pages
import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home/Home';
import ErrorFallBackUI from './pages/ErrorFallBackUI/ErrorFallBackUI';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Product  from "./pages/Product/Product";

//for routing
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import ProductContextComponent from './context/ProductsContext/ProductsContext';
import NavContextComponent from './context/NavLinksContext/NavContext';
import SignInContextComponent from './context/SignInContext/SignInContext';
import OrdersContextComponent from './context/OrdersContext/OrdersContext';


function App() {

//for routing  
const router=createBrowserRouter([{
  path:"/",
  element:<Navbar/>,
  errorElement:<ErrorFallBackUI/>,
  children:[
    {
      index:true,
      element:<Home/>,
    },
    {
      path:":productID",
      element:<Product/>
    },
    {
      path:"cart",
      element:<Cart/>
    },
    {
      path:"orders",
      element:<Orders/>
    },
    {
      path:"login",
      element:<Login/>
    },
    {
      path:"signup",
      element:<SignUp/>
    }
  ]
}])


  return (
    <div className="App">
     <SignInContextComponent>
      <OrdersContextComponent>
         <NavContextComponent>
            <ProductContextComponent>
            <RouterProvider router={router}/>
      </ProductContextComponent>
    </NavContextComponent>
    </OrdersContextComponent>
     </SignInContextComponent>
    
   
    </div>
  );
}

export default App;
