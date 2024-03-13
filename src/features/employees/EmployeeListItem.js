import React, { useState } from 'react';
import EmployeeDetails from './EmployeeDetails';



const EmployeeListItem = (props) => { 
  const { name, id } = props;
  const [isOpen, setIsOpen] = useState(false); 

  const handleOnClickEmployeeName = () => {
    setIsOpen(!isOpen);   
  };

  return (
    <div>
      <h2 onClick={handleOnClickEmployeeName}>{name}</h2>
      {isOpen && <EmployeeDetails id={id}/>}
    </div>
  );
};

export default EmployeeListItem;
