import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  Landing,
  Layout,
  Login,
  OtpVerification,
  Signup,
} from './pages/index.js';
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import SolverDashboard from './pages/SolverDashboard.jsx';
import SubAdminDashboard from './pages/SubAdminDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import MyComplaints from './pages/MyComplaints.jsx';

const useAuth = () => {
  // In a real app, this would get user info and token from Redux store
  const user = {
    id: '1',
    name: 'Test User',
    role: 'SUB_ADMIN', // Change this to test different roles: 'USER', 'SOLVER', 'SUB_ADMIN', 'ADMIN'
  };
  return { isAuthenticated: !!user, user };
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to a dashboard the user is allowed to access, or a 403 page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  // Determine which dashboard to show based on role
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
  const { user } = useAuth(); // Get current user role
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
              {getDashboardComponent(user.role)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/myComplaints"
          element={
            <DashboardLayout>
              <MyComplaints />
            </DashboardLayout>
          }
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
