import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter , createRoutesFromElements , Route, RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Register from './pages/Register';
import store  from './store/store'

import { Provider } from 'react-redux';
import PostStatus from './pages/PostStatus';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<Layout/>}>
      <Route path={''} element={<Home/>}/>      
      <Route path={'/warden/post'} element={<CreatePost/>}/>
      <Route path={'/warden/login'} element={<Login/>}/>
      <Route path={'/warden/register'} element={<Register/>}/>
      <Route path={'/warden/dashboard'} element={<Dashboard/>}/>
      <Route path={'/warden/post/:id/status'} element={<PostStatus/>}/>
    </Route>
  )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}/>
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
