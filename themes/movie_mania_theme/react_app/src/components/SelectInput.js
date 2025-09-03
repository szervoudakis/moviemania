import React from "react";

const SelectInput = ({ label, value, onChange, options}) => {
     return (
       <div className="form-group mb-3">
          <label className="form-label">{label}</label>
          <select 
             className="form-control"
             value={value}
             onChange={(e) => onChange(e.target.value)}
          >
            <option value="">--Select--</option>
             {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
           </select>
       </div>
     );
};

export default SelectInput;