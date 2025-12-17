import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { logoutService } from '../../services';
import Toast from '../ui/Toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClear } from '../../redux/slice/authSlice';
import AuthBackground from '../AuthBackground'

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    open: false,
    type: 'success',
    message: '',
  });
  const handleLogout = async () => {
    try {
      const response = await logoutService();
      if (!response.success) {
        setToast({
          open: true,
          type: 'error',
          message: 'Errors comes logout service',
        });
      }
      setToast({
        open: true,
        type: 'success',
        message: 'Successfully Logout.',
      });
      dispatch(setClear());
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    } catch (error) {
      setToast({
        open: true,
        type: 'error',
        message: `${error.message}`,
      });
    }
  };
  return (
    <AuthBackground>
      <div className="flex h-screen min-w-full overflow-hidden bg-blue-200/5">
        <Sidebar handleLogout={handleLogout} />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Header */}
          <Header handleLogout={handleLogout} />

          {/* Page Content */}
          <main className="p-4 md:p-8 flex-1">
            <div className="mx-auto min-w-full">{children}</div>
          </main>
        </div>
        <Toast
          isOpen={toast.open}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </div>
    </AuthBackground>
  );
};

export default DashboardLayout;
