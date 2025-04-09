import { useState } from 'react';

export function useNotification() {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [visible, setVisible] = useState(false);

  const showNotification = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(msg);
    setType(type);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000); // Esconde após 4s
  };

  const closeNotification = () => setVisible(false);

  return {
    message,
    type,
    visible,
    showNotification,
    closeNotification,
  };
}
