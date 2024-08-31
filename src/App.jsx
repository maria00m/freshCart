
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Carts/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './Contexts/CounterContext';
import AuthContextProvider from './Contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedAuthRoutes from './components/ProtectedAuthRoutes/ProtectedAuthRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ShippingAddress from './components/ShippingAddress/ShippingAddress';
import AllOrder from './components/AllOrders/AllOrder';
import WishList from './components/WishList/WishList'
function App() {
const queryClient=new QueryClient()

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <ProtectedAuthRoutes><Login /></ProtectedAuthRoutes> },
        // { path: 'wishlist', element: <ProtectedAuthRoutes><WishList /></ProtectedAuthRoutes> },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        { path: 'register', element: <ProtectedAuthRoutes><Register /></ProtectedAuthRoutes> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '*', element: <Notfound /> },
        { path: 'allorders', element: <ProtectedRoute><AllOrder /></ProtectedRoute> },
        {
          path: "shippingaddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
      ]
    }
  ]);

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
        <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
          </CounterContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools />
    </QueryClientProvider>
        
    </>
  );
}

export default App;
