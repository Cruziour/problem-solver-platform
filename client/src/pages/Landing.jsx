import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 relative z-10">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-blue-500">💡</span>
          Problem Solver
        </div>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#home" className="hover:text-white">
            Home
          </a>
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#about" className="hover:text-white">
            About
          </a>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded bg-[#0b1120] border border-gray-600 hover:border-blue-500"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center text-center px-6 mt-24 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Problem <span className="text-blue-500">Solver</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          A smart platform to submit, track and resolve real-world problems.
          Designed for colleges, organizations and institutions with role-based
          complaint handling.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/login"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-lg"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-8 py-3 rounded-lg border border-gray-600 hover:border-blue-500 text-lg"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="mt-32 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        {[
          {
            title: 'Role Based System',
            desc: 'Admin, Sub-Admin, Solver and User with controlled permissions.',
          },
          {
            title: 'Smart Complaint Flow',
            desc: 'Category-based routing, assignment and real-time updates.',
          },
          {
            title: 'Real-Time Alerts',
            desc: 'Socket.IO based notifications for faster resolution.',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#0b1120] border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-semibold text-blue-500">
              {item.title}
            </h3>
            <p className="text-gray-400 mt-3">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-32 text-center text-gray-500 py-6 border-t border-gray-800">
        © {new Date().getFullYear()} Problem Solver | Major2 Project
      </footer>
    </div>
  );
};

export default Landing;
