import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import Dataset from "./pages/Dataset";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" children={<Login />} />
        <Route path="/dataset/:dataset_id/:device_id" children={<Document />} />
        <Route path="/dataset/:dataset_id" children={<Dataset />} />
        <Route path="/" children={<Dashboard />} />
      </Switch>
    </Router>
  );
}

export default App;
