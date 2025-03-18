// App.js
import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>School Management System</h1>
      <p>Message from the backend: {message}</p>
    </div>
  );
}

export default App;