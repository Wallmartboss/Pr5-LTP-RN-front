
import s from './Dropdown.module.css';
import sprite from '../../icons/icons.svg'
import { useEffect, useRef } from 'react';

const Dropdown = ({isOpen, filteredColumns, handleMoveCard, onClose }) => {
   
    const dropdownRef = useRef(null); 
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
               onClose(); 
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside); 

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); 
        };
    }, [onClose]);

    if (!isOpen) return null;
    return (
        <div className={s.dropdown} ref={dropdownRef}>
            {filteredColumns.map((column) => (
                <button className={s.btn} key={column._id} onClick={() => handleMoveCard(column._id)}>
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