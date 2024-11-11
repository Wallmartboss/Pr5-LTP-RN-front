
import s from './Dropdown.module.css';
import sprite from '../../icons/icons.svg'
import { useEffect, useRef } from 'react';

const Dropdown = ({ filteredColumns, openDropdown, handleMoveCard, cardId,closeDropdown  }) => {
    const dropdownRef = useRef(null); 

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeDropdown(); 
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeDropdown]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown(); // Закрити дропдаун, якщо натиснуто за його межами
            }
        };

        document.addEventListener('mousedown', handleClickOutside); // Слухаємо подію миші

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Очищаємо слухача при розмонтажі компонента
        };
    }, [closeDropdown]);

    if (!openDropdown) {
        return null;
    }
    return (
        <div className={s.dropdown} ref={dropdownRef}>
            {filteredColumns.map((column) => (
                <button className={s.btn} key={column._id} onClick={() => handleMoveCard(column._id, cardId)}>
                    <span>{column.title}</span>
                    <svg className={s.icon} width="16" height="16">
                        <use href={`${sprite}#arrow-circle-icon`} />
                    </svg>
                </button>
            ))}
        </div>
    );
};

export default Dropdown;