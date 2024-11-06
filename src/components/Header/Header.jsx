import clsx from 'clsx';
import s from './Header.module.css';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../../redux/user/operations.js';
import { selectUserTheme } from '../../redux/user/selectors.js';
const Header = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectUserTheme);
  const [theme, setTheme] = useState(currentTheme || 'light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const chooseTheme = async newTheme => {
    try {
      await dispatch(updateTheme({ theme: newTheme }));
      setTheme(newTheme);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode', 'violet-mode');
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
              <li
                className={clsx({ [s.selected]: theme === 'light' })}
                onClick={() => chooseTheme('light')}
              >
                Light
              </li>
              <li
                className={clsx({ [s.selected]: theme === 'dark' })}
                onClick={() => chooseTheme('dark')}
              >
                Dark
              </li>
              <li
                className={clsx({ [s.selected]: theme === 'violet' })}
                onClick={() => chooseTheme('violet')}
              >
                Violet
              </li>
            </ul>
          </div>
          <UserInfo />
        </div>
      </div>
    </header>
  );
};
export default Header;
