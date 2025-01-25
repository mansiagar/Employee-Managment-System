// import { useState, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import App from "../App";
import "../styles/addEmployeeForm.css";

const AddEmployessForm = () => {
  const [EmployeeName, setEmployeeName] = useState("");
  const [designation, setdesinagtion] = useState("");
  const [department, setdepartment] = useState("");
  const [home, setHome] = useState(false);
  let handleAdd = () => {
    axios({
      url: ` http://localhost:3000/employees`,
      method: "POST",
      data: {
        id: Math.ceil(Math.random() * 10),
        name: EmployeeName,
        desination: designation,
        department: department,
      },
    })
      .then((res) => console.log(res.data))

      .catch((err) => console.log(err));
  };
  return (
    <div>
      <button onClick={() => setHome(!home)}>Home Page</button>
      {home ? (
        <div>
          <App />
        </div>
      ) : (
        <div className="Container">
          <input
            type="text"
            placeholder="Enter Employee name"
            value={EmployeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Employee desination"
            value={designation}
            onChange={(e) => setdesinagtion(e.target.value)}
          />
          <select
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
          </select>
          <button onClick={handleAdd}>Add Employee</button>
        </div>
      )}
    </div>
  );
};

export default AddEmployessForm;
