
import React from 'react';
import Home from './pages/Home';
// import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import {RouterProvider, createBrowserRouter, createMemoryRouter, Outlet, useRouteError} from "react-router-dom"
import { ThemeProvider } from '@material-tailwind/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <PageError/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
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

function PageError() {
  const error = useRouteError()
  return <>
    <h1>Une erreur est survenue</h1>
    <p>
      {error?.error?.toString() ?? error?.toString()}
    </p>
  </>
}

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
  return (
  <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;


// return <RouterProvider router={router}/>

