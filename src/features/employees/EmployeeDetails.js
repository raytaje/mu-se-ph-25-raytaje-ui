import React , { useState, useEffect} from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployee($employeeId: ID!) {
    employee(id: $employeeId) {
      dob
      name
      title
    }
  }
`;
const EmployeeDetails = (props) => {
  const { id } = props;
 
  const  { loading, error, data } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { employeeId: id },
  }); 

  if (loading) {
    return <p>Loading...</p>; 
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <ul>
        <li>Name: {data.employee.name}</li>
        <li>Title: {data.employee.title}</li>
        <li>Date of birth: {data.employee.dob}</li>
      </ul>
    </>
  );
};

export default EmployeeDetails;
