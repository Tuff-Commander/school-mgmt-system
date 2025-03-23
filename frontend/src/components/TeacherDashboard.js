import React, { useEffect, useState } from "react";
import api from "../api";

const TeacherDashboard = () => {
  const [teachers, setTeachers] = useState([]);

  // Fetch all teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teachers");
        console.log("Fetched teachers:", response.data); // Debugging
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teacher Dashboard</h2>
      {teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <ul className="list-group">
          {teachers.map((teacher) => (
            <li key={teacher._id} className="list-group-item">
              <strong>{teacher.name}</strong> - Email: {teacher.email}
              <div>
                <small>Classes: {teacher.classes.length}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherDashboard;
