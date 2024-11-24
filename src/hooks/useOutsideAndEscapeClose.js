import { useEffect } from 'react';

const useOutsideAndEscapeClose = (ref, onClose) => {
  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, onClose]);
};

export default useOutsideAndEscapeClose;
