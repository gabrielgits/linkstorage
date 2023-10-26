import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CONSTANTS from './core/constants';
import { loadData } from './core/local';
import Login from './components/Login';
import Signup from './components/Signup';
import LinkAdd from './components/LinkAdd';
import CategoryAdd from './components/CategoryAdd';
import CategoryList from './components/CategoryList';
import GlobalContext from './core/context';
import { useState } from 'react';
import { useEffect } from 'react';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      const localSession = localStorage.getItem(CONSTANTS.key_session);
      if (localSession === null) {
        return redirect('/login');
      }
      return null;
    },
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/add-link',
    element: <LinkAdd />,
    children: [
      {
        path: 'add-category',
        element: <CategoryAdd />,
      },
    ],
  },
  {
    path: '/categories',
    element: <CategoryList />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

function App() {

  const [globalState, setGlobalState] = useState({
    categories: [],
    links: [],
  });

  useEffect(() => {
    const { links, categories } = loadData();
    setGlobalState({
      categories,
      links
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      <RouterProvider router={router} ></RouterProvider>
    </GlobalContext.Provider>
  );
}

export default App;
