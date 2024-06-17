
import React from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import {RouterProvider, createBrowserRouter, createMemoryRouter, Outlet} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Outlet/></div>,
    children: [
      {
        path: 'login',
        element: <div>login</div>
      },
      {
        path: 'articles',
        element: <div>articles</div>
      },
      {
        path: 'contact',
        element: <div>contact</div>
      },
    ]
  }
])

function Root() {
  return <>
    <Header/>
    <div className='page-content'>
      <Outlet/>
    </div>
    <Footer/>
  </>
}

function App() {
  return <RouterProvider router={router}/>
}

export default App;




