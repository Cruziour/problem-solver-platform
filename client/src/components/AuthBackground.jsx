const AuthBackground = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-between relative overflow-hidden bg-[#020617]">
    
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#020617] via-[#020617] to-[#020617]" />

      {/* Blue glow effects */}
      <div className="absolute -top-32 -left-32 w-105 h-105 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-105 h-105 bg-indigo-600/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </div>
  );
};

export default AuthBackground;
