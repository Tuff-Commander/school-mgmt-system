import React, { useEffect, useState } from "react";
import api from "../api";

const StudentList = ({ onStudentUpdated, onStudentDeleted, onEditStudent }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [onStudentUpdated, onStudentDeleted]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      onStudentDeleted(id);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (student) => {
    onEditStudent(student);
  };

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className="list-group">
          {students.map((student) => (
            <li key={student._id} className="list-group-item">
              {student.name} - Age: {student.age}, Grade: {student.grade}
              <button
                className="btn btn-warning btn-sm ms-2"
                onClick={() => handleEdit(student)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleDelete(student._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;