import { useState } from "react";
import "./styles.scss";

export default function Calendar() {
  //declaring weeksdays and months, and dateInMonth for rendering
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //creating state to nagivating between different month, initial state would be the current month.
  const currentDate = new Date();
  //getting today's date/month/year
  const currentDay = currentDate.getDate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  //declaring function for handling month/year navigation
  const handleMonthChange = (increment) => {
    //accessing prev state of the currentMonth/Year and change the month and year
    setCurrentMonth((prevMonth) => {
      //setting new month and year
      let newMonth = prevMonth + increment;
      let newYear = currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      //changing new month and year
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleYearChange = (year) => {
    setCurrentYear(parseInt(year)); // Ensure year is parsed as integer
  };

  const renderDays = () => {
    // Use JavaScript's Date object to get the last day of the current month for total days
    const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Use Date Object to get first day of the week on the month
    const numEmptyCells = new Date(currentYear, currentMonth, 1).getDay();
    // get last day of previous month
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    //creating cells array
    const cells = [];
    // loop to create days from prev month to the current month
    for (
      let emptyCell = numEmptyCells - 1;
      emptyCell >= 0 && emptyCell < 7;
      --emptyCell
    ) {
      //create prevMonthDay from last day - total empty cell need to
      const prevMonthDays = lastDayOfPrevMonth - emptyCell;
      //pushing prev month ending days into cells
      cells.push(
        <div className="empty-cell" key={`empty-${emptyCell}`}>
          {prevMonthDays}
        </div>
      );
    }
    //loop to create each day of the month and push to cells
    for (let day = 1; day <= numDaysInMonth; ++day) {
      //create a boolean checking for today's date
      const isToday =
        day === currentDay &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear();
      //pushing all days of the month into cell
      cells.push(
        <div className={`day ${isToday ? "today" : ""}`} key={`day-${day}`}>
          {day}
        </div>
      );
    }
    //loop to fill in days after the available days (maximum cell is 42 to fill the calendar)
    let nextMonthDays = 42 - cells.length;
    for (let fillInCells = 1; fillInCells <= nextMonthDays; ++fillInCells) {
      cells.push(
        <div className="empty-cell" key={`fillInCells-${fillInCells}`}>
          {fillInCells}
        </div>
      );
    }
    //return cells for rendering
    return cells;
  };

  //render
  return (
    <div className="calendar-container">
      <div className="month-navigator">
        <button
          className="month-switch"
          onClick={() => {
            handleMonthChange(-1);
          }}
        >
          &lsaquo;
        </button>
        <div className="current-Month">{months[currentMonth]}</div>
        <select
          className="year-selection"
          name="year"
          value={currentYear}
          onChange={(event) => handleYearChange(event.target.value)}
        >
          <option id="0">{currentYear - 2}</option>
          <option id="1">{currentYear - 1}</option>
          <option id="2">{currentYear}</option>
          <option id="3">{currentYear + 1}</option>
          <option id="4">{currentYear + 2}</option>
        </select>
        <button
          className="month-switch"
          onClick={() => {
            handleMonthChange(1);
          }}
        >
          &rsaquo;
        </button>
      </div>
      <div className="week-days">
        {weekDays.map((day, index) => (
          <div className="day-of-week" key={index}>
            {day}
          </div>
        ))}
      </div>
      <div className="month-grid">{renderDays()}</div>
    </div>
  );
}
