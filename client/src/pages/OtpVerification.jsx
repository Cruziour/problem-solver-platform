import { useEffect, useRef, useState } from 'react';
import { MailCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthBackground, Toast } from '../components/index';
import { resendOtpService, validateOtpService } from '../services';

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendLoading, setResendLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 5 min = 300 sec
  const [toast, setToast] = useState({
    open: false,
    type: 'success',
    message: '',
  });

  const inputsRef = useRef([]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  /* ================= OTP INPUT ================= */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hash = localStorage.getItem('hash');
      const expires = localStorage.getItem('expires');
      const email = localStorage.getItem('email');
      const payload = {
        otp: otp.join(''),
        hash,
        email,
        expires,
      };

      const response = await validateOtpService(payload);
      if (!response.success) {
        setToast({
          open: true,
          type: 'error',
          message: 'Otp validation failed.',
        });
        return;
      }
      setToast({
        open: true,
        type: 'success',
        message: 'OTP verified successfully',
      });
      localStorage.clear();
      setLoading(false);
      setTimeout(() => {
        setOtp(['', '', '', '', '', '']);
        navigate('/login'); // or /dashboard
      }, 2000);
    } catch (error) {
      setToast({
        open: true,
        type: 'error',
        message: error.message,
      });
      setLoading(false);
      alert('Invalid OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const email = localStorage.getItem('email');

      const res = await resendOtpService({ email });

      localStorage.setItem('hash', res?.data.hash);
      localStorage.setItem('expires', res?.data.expires);
      localStorage.setItem('email', res?.data?.email);
      setToast({
        open: true,
        type: 'success',
        message: 'Otp sent on your email.',
      });
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0].focus();
      setTimeLeft(300);
    } catch (err) {
      setToast({
        open: true,
        type: 'error',
        message: err.message,
      });
    } finally {
      setOtp(['', '', '', '', '', '']);
      setResendLoading(false);
    }
  };

  return (
    <>
      <AuthBackground>
        <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-4">
            <MailCheck size={44} className="text-blue-500" />
          </div>

          <h2 className="text-2xl font-semibold text-white text-center">
            OTP Verification
          </h2>

          <p className="text-gray-400 text-sm text-center mt-2">
            OTP has been sent to your registered email
          </p>

          <p className="text-center text-sm text-blue-400 mt-1">
            Expires in {formatTime()}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  disabled={loading || timeLeft <= 0}
                  required
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold rounded-lg
                bg-black/50 border border-white/10 text-white
                focus:outline-none focus:ring-2 focus:ring-blue-600
                disabled:opacity-50"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.includes('') || timeLeft <= 0}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700
            text-white font-medium transition
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          {timeLeft <= 0 && (
            <p className="text-center text-red-400 text-sm mt-4">
              OTP expired. Please resend OTP.
            </p>
          )}

          <div className="text-center mt-4">
            <button
              disabled={timeLeft > 0 || resendLoading}
              onClick={handleResendOtp}
              className={`text-sm ${
                timeLeft > 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-blue-400'
              }`}
            >
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        </div>
        <Toast
          isOpen={toast.open}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </AuthBackground>
    </>
  );
};

export default OtpVerification;
