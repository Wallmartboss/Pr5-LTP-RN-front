import clsx from 'clsx';
import s from './Header.module.css';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { useEffect, useState } from 'react';
const Header = () => {
  const [theme, setTheme] = useState('White');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove('White-mode', 'dark-mode', 'violet-mode');
    setIsDropdownOpen(false);
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  return (
    <header className={s.header}>
      <div className={clsx('container', s.header_container)}>
        <div className={s.burger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={s.header_wrapper}>
          <div className={s.theme}>
            <span onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Theme
            </span>
            <ul
              className={clsx(s.theme_dropdown, { [s.active]: isDropdownOpen })}
            >
              <li onClick={() => setTheme('White')}>Light</li>
              <li onClick={() => setTheme('dark')}>Dark</li>
              <li onClick={() => setTheme('violet')}>Violet</li>
            </ul>
          </div>
          <UserInfo />
        </div>
      </div>
    </header>
  );
};
export default Header;
