import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AdminDashboard,
  Landing,
  Layout,
  Login,
  MyComplaints,
  OtpVerification,
  Signup,
  SolverDashboard,
  SubAdminDashboard,
  UserDashboard,
} from './pages/index.js';
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  const { user } = useSelector((state) => state.auth);
  const getDashboardComponent = (role) => {
    switch (role) {
      case 'USER':
        return <UserDashboard />;
      case 'SOLVER':
        return <SolverDashboard />;
      case 'SUB_ADMIN':
        return <SubAdminDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return <Navigate to="/login" replace />; // Should not happen if auth is correct
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verifyOtp" element={<OtpVerification />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={['USER', 'SOLVER', 'SUB_ADMIN', 'ADMIN']}
            >
              <DashboardLayout>
                {getDashboardComponent(user?.role)}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/myComplaints"
          element={
            <ProtectedRoute
              allowedRoles={['USER', 'SOLVER', 'SUB_ADMIN', 'ADMIN']}
            >
              <DashboardLayout>
                <MyComplaints />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
