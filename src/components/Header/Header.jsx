import clsx from 'clsx';
import s from './Header.module.css';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateTheme } from '../../redux/user/operations.js';
import { selectUserTheme } from '../../redux/user/selectors.js';
import sprite from '../../icons/icons.svg';
import Burger from '../Burger/Burger.jsx';
const Header = () => {

  const dispatch = useDispatch();
  const currentTheme = useSelector(selectUserTheme);
  const [theme, setTheme] = useState(currentTheme || 'light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const chooseTheme = async newTheme => {
    try {
      setTheme(newTheme);
      await dispatch(updateTheme({ theme: newTheme }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode', 'violet-mode');
    document.body.classList.add(`${theme}-mode`);
    setIsDropdownOpen(false);
  }, [theme]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        await dispatch(getUser());
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, [dispatch]);

  return (
    <header className={s.header}>
      <div className={clsx('container', s.header_container)}>
        <Burger/>
        <div className={s.header_wrapper}>
          <div className={s.theme}>
            <span
              className={s.theme}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Theme
              <svg className={s.arrow_icon} width="12" height="6">
                <use href={`${sprite}#icon-arrow-down`} />
              </svg>
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
