import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'error';
}

function Toast({ message, onClose, duration = 5000, type = 'success' }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isError = type === 'error';
  const borderColor = isError ? 'border-red-500/30' : 'border-green-500/30';
  const shadowColor = isError ? 'shadow-red-500/20' : 'shadow-green-500/20';
  const iconBg = isError ? 'from-red-500/20 to-rose-500/20' : 'from-green-500/20 to-emerald-500/20';
  const iconColor = isError ? 'text-red-400' : 'text-green-400';

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className={`glass-card max-w-md p-4 rounded-xl border ${borderColor} shadow-2xl ${shadowColor} bg-gray-900/95 backdrop-blur-xl`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconBg} flex items-center justify-center`}>
              <CheckCircle className={`w-6 h-6 ${iconColor}`} />
            </div>
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-white font-medium leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
