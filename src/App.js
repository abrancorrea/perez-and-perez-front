import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clients from "./views/Clients";
import Cars from "./views/Cars";
import Fixes from "./views/Fixes";
import AppContainer from "./components/AppContainer";

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/client/:id/cars" element={<Cars />} />
          <Route path="/fixes" element={<Fixes />} />
          <Route path="/" exact element={<Clients />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
