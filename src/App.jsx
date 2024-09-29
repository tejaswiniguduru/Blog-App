import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import Contact from './components/contact'; // If you still want this route, keep it here
import CreateBlog from './components/CreateBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';

function App() {
  return (
    <>
      <div className='bg-dark text-center py-2 shadow-lg'>
        <h1 className='text-white'>React Laravel Blog App</h1>
      </div>

      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogDetail />} />
        <Route path='/blog/edit/:id' element={<EditBlog />} />
        {/* Uncomment this line if you want to use the contact route in the future */}
        {/* <Route path='/contact' element={<Contact />} /> */}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
