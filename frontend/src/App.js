import React, { useState, useEffect } from "react";
import StudentList from "./components/StudentList"; // Default import
import AddStudent from "./components/AddStudent"; // Default import
import EditStudent from "./components/EditStudent"; // Default import
import ParentPortal from "./components/ParentPortal"; // Default import
import api from "./api"; // Ensure this is the correct path

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [parentId, setParentId] = useState("67ded0b092aff0ba279f857d"); // Initialize with an empty string
  const [parents, setParents] = useState([]); // State to store all parents

  // Fetch all parents on component mount
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await api.get("/parents");
        setParents(response.data);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };

    fetchParents();
  }, []);

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
      <h1 className="text-center my-4">School Management System</h1>
      <div className="container">
        <div className="mb-4">
          <label htmlFor="parentSelect" className="form-label">
            Select Parent:
          </label>
          <select
            id="parentSelect"
            className="form-select"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="">Select a parent</option>
            {parents.map((parent) => (
              <option key={parent._id} value={parent._id}>
                {parent.name}
              </option>
            ))}
          </select>
        </div>
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
        {parentId && <ParentPortal parentId={parentId} />}
      </div>
    </div>
  );
}

export default App;