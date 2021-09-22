import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Surveillance from "./pages/Surveillance";
import Imagelist from "./pages/Imagelist";
import Dashboard from "./pages/Dashboard";
import Controls from "./pages/Controls";
import Document from "./pages/Document";
import Dataset from "./pages/Dataset";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" children={<Login />} />
        <Route path="/controls/:device_id" children={<Controls />} />
        <Route
          path="/surveillance/:dataset_id/:device_id"
          children={<Surveillance />}
        />
        <Route path="/imagelist/:dataset_id" children={<Imagelist />} />
        <Route path="/dataset/:dataset_id/:device_id" children={<Document />} />
        <Route path="/dataset/:dataset_id" children={<Dataset />} />
        <Route path="/" children={<Dashboard />} />
      </Switch>
    </Router>
  );
}

export default App;
