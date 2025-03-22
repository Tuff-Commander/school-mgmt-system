import React, { useState } from "react";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Function to handle new student addition
  const handleStudentAdded = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  // Function to handle student updates
  const handleStudentUpdated = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
    setEditingStudent(null); // Clear the editing state
  };

  // Function to handle student deletions
  const handleStudentDeleted = (id) => {
    setStudents(students.filter((student) => student._id !== id));
  };

  return (
    <div className="App">
      <h1>School Management System</h1>
      {editingStudent ? (
        <EditStudent
          student={editingStudent}
          onStudentUpdated={handleStudentUpdated}
        />
      ) : (
        <>
          <AddStudent onStudentAdded={handleStudentAdded} />
          <StudentList
            onStudentUpdated={handleStudentUpdated}
            onStudentDeleted={handleStudentDeleted}
            onEditStudent={setEditingStudent}
          />
        </>
      )}
    </div>
  );
}

export default App;