import clsx from 'clsx';
import s from './Header.module.css';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../../redux/user/operations.js';
import { selectUserTheme } from '../../redux/user/selectors.js';
import sprite from '../../icons/icons.svg';
const Header = () => {
  return (
    <header>
      <h1>Test header</h1>
    </header>
  );
};

export default Header;
