
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarPicker.css'
const CalendarPicker = ({ selectedDate, setSelectedDate,closeCalendar }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        closeCalendar(); 
      }}
      
      dateFormat="MMMM d, yyyy"
      inline
       calendarClassName="datepicker"
    />
  );
};

export default CalendarPicker;
