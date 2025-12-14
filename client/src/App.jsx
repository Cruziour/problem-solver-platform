import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import {
  Landing,
  Layout,
  Login,
  OtpVerification,
  Signup,
} from './pages/index.js';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verifyOtp" element={<OtpVerification />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
