import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import PrivateRouting from "./components/Routings/PrivateRouting";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PrivateRouting exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPassword}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
