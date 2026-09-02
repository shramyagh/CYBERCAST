import { useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function ComingSoonToast({ module, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [module, onClose]);

  return (
    <div className="coming-soon-toast flex items-center gap-2">
      <Clock size={13} style={{ color: '#22D3EE' }} />
      <span>{module} — Module coming soon</span>
    </div>
  );
}
