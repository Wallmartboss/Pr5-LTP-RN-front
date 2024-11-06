import s from './SideBar.module.css';
import NeedHelp from './NeedHelp/NeedHelp.jsx';
import Logout from './Logout/Logout.jsx';

import { useEffect, useRef, useCallback } from 'react';

const modalRoot = document.getElementById('modal-root');

const SideBar = ({ setIsMenuOpen, isMenuOpen }) => {
  const menuRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      (!modalRoot || !modalRoot.contains(event.target)) &&
      isMenuOpen &&
      window.innerWidth < 1440
    ) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, setIsMenuOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className={`${s.sidebarContainer} ${
        isMenuOpen ? s.openSidebar : ''
      }`}
    >
      <div
        className={isMenuOpen ? s.openSidebar : s.sidebar}
        ref={menuRef}
      >
        <div className={s.needHelpLogout}>
          <NeedHelp />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

