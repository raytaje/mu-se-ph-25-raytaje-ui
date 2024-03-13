import React, { useState, useEffect } from 'react';
import EmployeeListItem from './EmployeeListItem';
import { useQuery, gql } from '@apollo/client';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      avatarUrl
      id
      name
      department
    }
  }
`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setselectedDepartment] = useState('');
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  
  const handleDepartmentOnchange = (e) => {
    const dept = e.target.value;

    setselectedDepartment(dept);
    console.log(dept);
    const filteredEmployees =
      dept === 'all'
        ? data.employees
        :  data.employees.filter(
            (emp) => emp.department === dept 
          );
    setEmployees(filteredEmployees);
  };

  useEffect(() => {
    if (!loading) {
      setEmployees(data.employees);
    }
  }, [loading, data]);


  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <label> Filter By Department: </label>
      <select
        value={selectedDepartment}  
        onChange={handleDepartmentOnchange}  
      >
        <option value="all">All</option>
        <option value="IT">IT</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
      </select>
     
      {employees.map((emp) => (
        <EmployeeListItem
          key={emp.id}
          id={emp.id}
          name={emp.name}
          avatarUrl={emp.avatarUrl}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
