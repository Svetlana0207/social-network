import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ProfileSearch from "./pages/ProfileSearch/ProfileSearch";
import Register from "./pages/register/Register";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {AuthContext, AuthContextProvider} from './context/AuthContext'
import { useContext } from "react";
import Messenger from "./components/messenger/Messenger"


function App() {

  const {user}=useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user?<Home/>:<Register/>}
        </Route>
        <Route path="/login">
         {user?<Redirect to="/"/>: <Login/>}
        </Route>
        <Route path="/register">
        {user?<Redirect to="/"/>: <Register/>}
        </Route>
        <Route path="/messenger">
        {!user?<Redirect to="/"/>: <Messenger/>}
        </Route>
        <Route path="/profile/:username">
          <Profile/>
        </Route>
        <Route path="/profileSearch/:desc">
          <ProfileSearch/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
