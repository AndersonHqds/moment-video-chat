import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Room from "./pages/room";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room">
          <Room />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
