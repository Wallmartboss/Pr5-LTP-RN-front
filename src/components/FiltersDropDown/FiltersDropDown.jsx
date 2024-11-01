import React, { useState } from 'react';
import s from './FiltersDropDown.module.css';

const FiltersDropDown = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    none: false,
    low: false,
    medium: false,
    high: false,
  });

  const [isOpen, setIsOpen] = useState(false); // поміняти потім на false

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

  return (
    <div className={s.dropDown}>
      <button className={s.filtersBtn} onClick={() => setIsOpen(!isOpen)}>
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
              X
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
