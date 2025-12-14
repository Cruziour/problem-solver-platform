import { useState } from 'react';
import AuthBackground from '../components/AuthBackground';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword, name);
    setTimeout(() => {
      navigate('/verifyOtp');
    }, 2000);
    setIsSubmitting(true);
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-54 items-center">
        {/* LEFT CONTENT (TEXT AREA) */}
        <div className="text-white">
          <h1 className="text-4xl font-semibold leading-tight">
            Welcome to <br />
            <span className="text-blue-500">Problem Solver</span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-lg">
            A centralized platform to raise, track, and resolve real-world
            problems with role-based access and smart complaint management.
          </p>

          <ul className="mt-8 space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Role-based complaint handling
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Real-time status updates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Admin controlled workflow
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Secure & scalable system
            </li>
          </ul>
        </div>

        {/* RIGHT SIGNUP CARD */}
        <div className="glass-card rounded-2xl p-10 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm" htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Enter you name"
                disabled={isSubmitting}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Enter you email"
                disabled={isSubmitting}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  placeholder="Enter your password"
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

            <div>
              <label
                className="text-gray-300 text-sm"
                htmlFor="confirmPassword"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Enter confirm password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold tracking-wide disabled:opacity-60"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to={'/login'}>
              <span className="text-blue-500 cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </AuthBackground>
  );
};

export default Signup;
