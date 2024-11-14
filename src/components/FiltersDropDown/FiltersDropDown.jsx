import React, { useEffect } from 'react';
import s from './FiltersDropDown.module.css';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEditModalOpen,
  selectIsDeleteModalOpen,
  selectIsFiltersOpen,
  selectIsModalOpen,
  selectSelectedFilter,
} from '../../redux/columns/selectors';
import {
  selectAllPriorities,
  togglePriorityFilter,
} from '../../redux/filters/filtersSlice';
import { toggleFiltersOpen } from '../../redux/columns/slice';

const FiltersDropDown = () => {
  const isOpen = useSelector(selectIsFiltersOpen);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isEditModalOpen = useSelector(selectEditModalOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const selectPriority = useSelector(state => state.filters.priority);
  const dispatch = useDispatch();

  const handlePriorityChange = priorityLevel => {
    dispatch(togglePriorityFilter({ priorityLevel }));
  };

  const handleSelectAll = () => {
    dispatch(selectAllPriorities());
  };

  const handleToggleOpen = () => {
    dispatch(toggleFiltersOpen());
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (
        event.key === 'Escape' &&
        !isModalOpen &&
        !isEditModalOpen &&
        !isDeleteModalOpen
      ) {
        dispatch(toggleFiltersOpen());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, isModalOpen, isEditModalOpen, isDeleteModalOpen]);

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
            <span onClick={handleSelectAll} className={s.showAllFilters}>
              Show all
            </span>
          </div>
          <div className={s.prioList}>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="without"
                checked={selectPriority.none}
                onChange={() => handlePriorityChange('without')}
              />
              <span className={`${s.checkmark} ${s.checkmarkNone}`}></span>
              Without priority
            </label>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="low"
                checked={selectPriority.low}
                onChange={() => handlePriorityChange('low')}
              />
              <span className={`${s.checkmark} ${s.checkmarkLow}`}></span>
              Low
            </label>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="medium"
                checked={selectPriority.medium}
                onChange={() => handlePriorityChange('medium')}
              />
              <span className={`${s.checkmark} ${s.checkmarkMedium}`}></span>
              Medium
            </label>
            <label className={s.prioItem}>
              <input
                type="checkbox"
                value="high"
                checked={selectPriority.high}
                onChange={() => handlePriorityChange('high')}
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
