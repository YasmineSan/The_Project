
import React from 'react';
import Home from './pages/Home';
import LoginInscriptionPage from './pages/LoginInscriptionPage';
import ContactUser from './pages/ContactUser';
// import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import { UserCart } from './pages/UserCart';
import AddArticlePage from './pages/AddArticlePage';
import UserProfile from './pages/UserProfile';
import CommentPage from './pages/CommentPage';
import FavoritePage from './pages/FavoritePage';
import SingleArticlePage from './pages/SingleArticlePage';
import AllArticles from './pages/AllArticles';
import {RouterProvider, createBrowserRouter, createMemoryRouter, Outlet, useRouteError} from "react-router-dom"



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
        element: <LoginInscriptionPage/>
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'contactUser/:userId',
        element: <ContactUser />
      },
      {
        path: 'addArticle',
        element: <AddArticlePage />
      },
      {
        path: 'cart',
        element: <UserCart />
      },
      {
        path: 'userProfile',
        element: <UserProfile />

      },
      {
        path: 'userProfile/:userId',
        element: <UserProfile />

      },
      {
        path: 'comment',
        element: <CommentPage />
      },
      {
        path: 'favorites',
        element: <FavoritePage /> 
      },
      {
        path: 'articles/:articleId',
        element: <SingleArticlePage /> 
      },
      {
        path: 'articles',
        element: <AllArticles /> 
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
      <RouterProvider router={router} />
  );
}

export default App;


// return <RouterProvider router={router}/>

