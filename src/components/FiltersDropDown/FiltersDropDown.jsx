import React, { useEffect, useState } from 'react';
import s from './FiltersDropDown.module.css';
import sprite from '../../icons/icons.svg';

const FiltersDropDown = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    none: false,
    low: false,
    medium: false,
    high: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = event => {
    const { value, checked } = event.target;
    setSelectedFilter(prev => ({
      ...prev,
      [value]: checked,
    }));
  };

  const selectAllFilters = () => {
    setSelectedFilter({
      none: true,
      low: true,
      medium: true,
      high: true,
    });
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={s.dropDown}>
      <button className={s.filtersBtn} onClick={() => setIsOpen(!isOpen)}>
        <svg className={s.filtersIcon} width="16" height="16">
          <use href={`${sprite}#filter-icon`} />
        </svg>
        Filters
      </button>
      {isOpen && (
        <div className={s.dropList}>
          <div className={s.filtersHeader}>
            <span className={s.modalName}>Filters</span>
            <button
              className={s.closeModalBtn}
              onClick={() => setIsOpen(false)}
            >
              <svg className={s.xCloseBtn} width="18" height="18">
                <use href={`${sprite}#x-close-icon`} />
              </svg>
            </button>
          </div>
          <div className={s.filtersTop}>
            <span className={s.filtersName}>Label color</span>
            <span onClick={selectAllFilters} className={s.showAllFilters}>
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
