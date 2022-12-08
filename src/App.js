import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Pages/Routes/routes';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='max max-w-screen-lg mx-auto'>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
