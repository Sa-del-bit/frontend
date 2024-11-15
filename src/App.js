import React from 'react';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Student & Faculty Management System</h1>
      <hr />
      <h2>Student Management</h2>
      <StudentList />
      <hr />
      <h2>Faculty Management</h2>
      <FacultyList />
    </div>
  );
}

export default App;
