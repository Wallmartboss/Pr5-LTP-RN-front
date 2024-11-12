import Flatpickr from "react-flatpickr";
import { useState, useEffect } from "react";
import "flatpickr/dist/themes/material_blue.css";
import "./Calendar.module.css"

const Calendar = () => {
  const [displayDate, setDisplayDate] = useState("");

  useEffect(() => {
    // Встановлюємо сьогоднішню дату у потрібному форматі при першому рендері
    const today = new Date();
    const formattedToday = `Today, ${today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })}`;
    setDisplayDate(formattedToday);
  }, []);

  const handleDateChange = (selectedDates, dateStr) => {
    const selectedDate = selectedDates[0];
    const today = new Date();

    // Очищаємо час для обраної і сьогоднішньої дати, щоб порівнювати тільки дати
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    // Якщо обрана дата — сьогодні, відображаємо як "Today, Month Day"
    if (selectedDate.getTime() === today.getTime()) {
      const formattedToday = `Today, ${selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}`;
      setDisplayDate(formattedToday);
    } else {
      // В іншому випадку використовуємо стандартний формат дати
      setDisplayDate(dateStr);
    }
  };

  return (
    <Flatpickr
      options={{
        minDate: "today",
        dateFormat: "l, F d", // Основний формат для інших дат
        locale: {
          "firstDayOfWeek": 1,
        },
      }}
      value={displayDate} // Відображуване значення
      onChange={handleDateChange}
      placeholder={displayDate}
    />
  );
};

export default Calendar;




