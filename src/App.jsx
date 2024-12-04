import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./create-trip/Home";
import CreateTrip from "./create-trip/CreateTrip";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </div>
  );
}

export default App;
