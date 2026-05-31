import { BrowserRouter as Router, Routes as RoutesRouter, Route } from 'react-router-dom'
import Admin from '../pages/admin'

function Routes() {
  return (
    <Router>
      <RoutesRouter>
        <Route path="/" element={<Admin />} />
      </RoutesRouter>
    </Router>
  )
}

export default Routes