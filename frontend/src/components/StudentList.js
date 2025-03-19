import React, { useEffect, useState } from "react";
import api from "../api";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // Fetch students from the backend
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
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - Age: {student.age}, Grade: {student.grade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;