import React, { useState } from "react";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";

function App() {
  const [students, setStudents] = useState([]);

  // Function to handle new student addition
  const handleStudentAdded = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="App">
      <h1>School Management System</h1>
      <AddStudent onStudentAdded={handleStudentAdded} />
      <StudentList />
    </div>
  );
}

export default App;