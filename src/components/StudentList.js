import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  // State variables
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  // API URL from environment variable
  const API_URL = `${process.env.REACT_APP_API_URL}/students`;

  // Fetch all students when the component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Function to save a new student or update an existing one
  const saveStudent = async () => {
    try {
      const studentData = { name, age: Number(age), grade };

      if (editingId) {
        // Update existing student
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        // Create new student
        await axios.post(API_URL, studentData);
      }

      // Reset form fields
      setName('');
      setAge('');
      setGrade('');
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  // Function to delete a student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Function to populate form fields for editing
  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <div>
      <h2>Student List</h2>

      {/* Form for adding or editing students */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <button onClick={saveStudent}>
        {editingId ? 'Update Student' : 'Add Student'}
      </button>

      {/* Display list of students */}
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - Age: {student.age}, Grade: {student.grade}
            <button onClick={() => editStudent(student)}>Edit</button>
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
