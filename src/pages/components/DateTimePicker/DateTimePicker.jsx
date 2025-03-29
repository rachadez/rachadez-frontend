import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DateTimePicker.css'; 
import { Calendar } from "lucide-react";

const DateTimePicker = ({ selectedDate, onChange }) => {
  return (
    <div className="date-input-container">
      
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="dd/MM/yyyy HH:mm"
        placeholderText="Selecione a data e hora"
        className="date-input"
      />
    </div>
  );
};

export default DateTimePicker;
