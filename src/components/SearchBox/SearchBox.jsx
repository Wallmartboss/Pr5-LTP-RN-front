import { useDispatch } from 'react-redux';
// import s from './SearchBox.module.css';
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};
export default SearchBox;
