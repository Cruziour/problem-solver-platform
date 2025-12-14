import { CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

const icons = {
  success: <CheckCircle className="text-green-500" size={22} />,
  error: <XCircle className="text-red-500" size={22} />,
  warning: <AlertTriangle className="text-yellow-500" size={22} />,
};

const bgColors = {
  success: 'border-green-500/40',
  error: 'border-red-500/40',
  warning: 'border-yellow-500/40',
};

export default function Toast({
  type = 'success',
  message = '',
  isOpen,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl
        bg-black/80 backdrop-blur-lg border ${bgColors[type]}
        shadow-lg animate-slide-in`}
      >
        {icons[type]}

        <p className="text-sm text-white">{message}</p>

        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
