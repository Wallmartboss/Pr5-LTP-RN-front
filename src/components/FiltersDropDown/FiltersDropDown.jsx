import React, { useEffect } from 'react';
import s from './FiltersDropDown.module.css';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEditModalOpen,
  selectIsFiltersOpen,
  selectIsModalOpen,
  selectSelectedFilter,
} from '../../redux/boards/selectors';
import {
  selectAllFilters,
  toggleFilter,
  toggleFiltersOpen,
} from '../../redux/boards/slice';

const FiltersDropDown = () => {
  const selectedFilter = useSelector(selectSelectedFilter);
  const isOpen = useSelector(selectIsFiltersOpen);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isEditModalOpen = useSelector(selectEditModalOpen);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    const { value, checked } = event.target;
    dispatch(toggleFilter({ value, checked }));
  };

  const handleSelectAllFilters = () => {
    dispatch(selectAllFilters());
  };

  const handleToggleOpen = () => {
    dispatch(toggleFiltersOpen());
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && !isModalOpen && !isEditModalOpen) {
        // додав перевірку на відкритість модального вікна бо закривання модалки через Esc автоматично відкривало фільтри
        dispatch(toggleFiltersOpen());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, isModalOpen, isEditModalOpen]);

  return (
    <div className={s.dropDown}>
      <button className={s.filtersBtn} onClick={handleToggleOpen}>
        <svg className={s.filtersIcon} width="16" height="16">
          <use href={`${sprite}#filter-icon`} />
        </svg>
        Filters
      </button>
      {isOpen && (
        <div className={s.dropList}>
          <div className={s.filtersHeader}>
            <span className={s.modalName}>Filters</span>
            <button className={s.closeModalBtn} onClick={handleToggleOpen}>
              <svg className={s.xCloseBtn} width="18" height="18">
                <use href={`${sprite}#x-close-icon`} />
              </svg>
            </button>
          </div>
          <div className={s.filtersTop}>
            <span className={s.filtersName}>Label color</span>
            <span onClick={handleSelectAllFilters} className={s.showAllFilters}>
              Show all
            </span>
          </div>
          <div className={s.prioList}>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="none"
                checked={selectedFilter.none}
                onChange={handleFilterChange}
              />
              <span className={`${s.checkmark} ${s.checkmarkNone}`}></span>
              Without priority
            </label>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="low"
                checked={selectedFilter.low}
                onChange={handleFilterChange}
              />
              <span className={`${s.checkmark} ${s.checkmarkLow}`}></span>
              Low
            </label>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="medium"
                checked={selectedFilter.medium}
                onChange={handleFilterChange}
              />
              <span className={`${s.checkmark} ${s.checkmarkMedium}`}></span>
              Medium
            </label>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="high"
                checked={selectedFilter.high}
                onChange={handleFilterChange}
              />
              <span className={`${s.checkmark} ${s.checkmarkHigh}`}></span>
              High
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersDropDown;
