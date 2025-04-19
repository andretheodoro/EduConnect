import { useState } from 'react';

export function useNotification() {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [visible, setVisible] = useState(false);

  const showNotification = (msg: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', time: number = 4000) => {
    setMessage(msg);
    setType(type);
    setVisible(true);
    console.log("showNotification", msg, type, time, visible);
    setTimeout(() => setVisible(false), time);
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
