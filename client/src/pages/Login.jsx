import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Toast } from '../components/index';
import { loginService } from '../services';
import { useDispatch } from 'react-redux';
import {
  setAccessToken,
  setAuth,
  setRefreshToken,
} from '../redux/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    type: 'success',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await loginService({ email, password });
      if (!response.success) {
        setToast({
          open: true,
          type: 'error',
          message: 'Something went wrong while login.',
        });
      }
      const user = response?.data?.user;
      const refreshToken = response?.data?.user.refreshToken;
      const accessToken = response?.data?.accessToken;

      dispatch(setAuth({ user }));
      dispatch(setAccessToken({ accessToken }));
      dispatch(setRefreshToken({ refreshToken }));

      setTimeout(() => {
        setToast({
          open: true,
          type: 'success',
          message: 'Login Succcessfully',
        });
        setEmail('');
        setPassword('');
        // navigate('/login'); // or /dashboard
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setToast({
        open: true,
        type: 'error',
        message: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Left Info Section */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-16 relative z-10">
        <h1 className="text-4xl font-bold leading-tight">
          Welcome to <br />
          <span className="text-blue-500">Problem Solver</span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg max-w-md">
          A centralized platform to raise, track, and resolve real-world
          problems with role-based access and smart complaint management.
        </p>

        <ul className="mt-8 space-y-3 text-gray-300">
          <li>✔ Role-based complaint handling</li>
          <li>✔ Real-time status updates</li>
          <li>✔ Admin controlled workflow</li>
          <li>✔ Secure & scalable system</li>
        </ul>
      </div>

      {/* Login Card */}
      <div className="flex w-full lg:w-1/2 items-center justify-center relative z-10">
        <div className="w-full max-w-md bg-[#0b1120]/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-500 mb-2">Login</h2>
          <p className="text-gray-400 mb-6">
            Sign in to continue to your dashboard
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                className="block text-sm text-gray-400 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-[#050816] border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <button className="w-full bg-blue-600 mt-8 hover:bg-blue-700 transition rounded-lg py-2 font-semibold">
              {isSubmitting ? 'Processing...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Signup */}
          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Only normal users can register. Roles are assigned by Admin.
          </p>
        </div>
      </div>
      <Toast
        isOpen={toast.open}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default Login;
