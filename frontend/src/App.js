import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import ParentPortal from "./components/ParentPortal";
import api from "./api"; // Ensure this is the correct path

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [parentId] = useState("67ded0b092aff0ba279f857d"); // Initialize with a valid parent ID
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Fetch all parents on component mount
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await api.get("/parents");
        console.log("Fetched parents:", response.data); // Debugging
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
        {token ? ( // If the user is logged in, show the dashboard
          <>
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
                <ParentPortal parentId={parentId} />
                <TeacherDashboard />
              </>
            )}
          </>
        ) : ( // If the user is not logged in, show the login form
          <Login onLogin={(token) => setToken(token)} />
        )}
      </div>
    </div>
  );
}

export default App;