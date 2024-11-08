
import s from './Burger.module.css'
import { toggleSidebar } from '../../redux/sidebarSlice/slice.js';
import { useDispatch } from 'react-redux';

const Burger = () => {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(toggleSidebar())} className={s.burger}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}

export default Burger
