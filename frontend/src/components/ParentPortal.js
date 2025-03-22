import React, { useEffect, useState } from "react";
import api from "../api";

const ParentPortal = ({ parentId }) => {
  const [students, setStudents] = useState([]);

  // Fetch student data for the parent
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/parents/${parentId}/students`);
        console.log("Fetched students:", response.data); // Debugging
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, [parentId]);

  return (
    <div className="container mt-4">
      <h2>Parent Portal</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className="list-group">
          {students.map((student) => (
            <li key={student._id} className="list-group-item">
              <strong>{student.name}</strong> - Age: {student.age}, Grade:{" "}
              {student.grade}
              <div>
                <small>Fee Status: {student.feeStatus || "Not Available"}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParentPortal;