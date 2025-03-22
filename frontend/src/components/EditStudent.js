import React, { useState, useEffect } from "react";
import api from "../api";

const EditStudent = ({ student, onStudentUpdated }) => {
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [grade, setGrade] = useState(student.grade);

  useEffect(() => {
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/students/${student._id}`, {
        name,
        age,
        grade,
      });
      onStudentUpdated(response.data);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grade:</label>
          <input
            type="text"
            className="form-control"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;