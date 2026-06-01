import { BrowserRouter as Router, Routes as RoutesRouter, Route } from "react-router-dom";
import PlayerPage from "../pages/player";

function Routes() {
  return (
    <Router>
      <RoutesRouter>
        <Route path="/" element={<PlayerPage />} />
      </RoutesRouter>
    </Router>
  );
}

export default Routes;
