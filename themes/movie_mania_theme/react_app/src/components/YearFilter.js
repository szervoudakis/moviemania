import React from "react";

const YearFilter = ({ years, selectedYear, onChange }) => {
  return (
    <select className="form-control" value={selectedYear} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Years</option>
      {years.map((yearObj, idx) => (
        <option key={idx} value={yearObj.release_date}>
          {yearObj.release_date}
        </option>
      ))}
    </select>
  );
};

export default YearFilter;
