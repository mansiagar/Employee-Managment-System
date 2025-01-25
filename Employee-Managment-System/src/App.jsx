import { useEffect, useState } from "react";
import AddEmployessForm from "./Components/AddEmployessForm";
import axios from "axios";
const App = () => {
  const [data, setData] = useState([]);
  //Loding state
  const [Loading, setLoading] = useState(false);
  //Error state
  const [error, setError] = useState("");
  // Addemployee button
  const [addEmployee, setaddEmployee] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios({
      url: `http://localhost:3000/employees`,
      method: "GET",
    })
      .then((res) => setData(res.data))
      .catch((error) =>
        setError(error.response ? error.response.data : error.message)
      )
      .finally(setLoading(false));
  }, []);

  // delete employee
  let handledelete = (id) => {
    axios({
      url: `http://localhost:3000/employees/${id}`,
      method: "DELETE",
    })
      .then((res) => setData(res.data))
      .catch((error) =>
        setError(error.response ? error.response.data : error.message)
      )
      .finally(setLoading(false));
  };
  return (
    <div>
      {addEmployee ? (
        <div>
          <AddEmployessForm />
        </div>
      ) : (
        <div>
          {error ? <h1>{error}</h1> : <></>}
          {Loading ? (
            <h1>Loading....</h1>
          ) : (
            <div>
              <table className="Container">
                <tr>
                  <th>name</th>
                  <th>desination</th>
                  <th>Department</th>
                </tr>
                {data.map((el) => (
                  <div key={el.id}>
                    <table>
                      <tr>
                        <td>{el.name}</td>
                        <td>{el.desination}</td>
                        <td>{el.department}</td>
                        <button onClick={() => handledelete(el.id)}>
                          Delete
                        </button>
                      </tr>
                    </table>
                  </div>
                ))}
              </table>
              <button onClick={() => setaddEmployee(!addEmployee)}>
                AddEmployee
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
