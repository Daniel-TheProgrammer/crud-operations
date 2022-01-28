import "./App.css";
import { useNavigate } from "react-router-dom";
import Crud from "./crud-operations/Crud";
function App() {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (token === null || token === "") {
    navigate("/");
  }
  return (
    <div className="App">
      <Crud />
    </div>
  );
}

export default App;
