import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./view/Auth/Login";
import Signup from "./view/Auth/SignUp";
import Home from "./view/Home/Home";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AnonRoute from "./components/Routes/AnonRoute";
import NavBar from './components/NavBar/NavBar'
import "./App.css";
import Spaces from './view/Spaces/Spaces'
import NewSpace from './view/Spaces/NewSpace'
import Space from './view/Space/Space'
import AllTasks from './view/Tasks/AllTasks'
import NewTask from './view/Tasks/NewTask'




function App() {
  return (
    <div className="App">
        <NavBar/>
        {/* <button onClick={() => localStorage.removeItem("user")}>logout</button> */}
        <Switch>
          <AnonRoute exact path="/login">
            <Login />
          </AnonRoute>
          <AnonRoute  exact path="/signup">
            <Signup />
          </AnonRoute>
          <PrivateRoute  exact path="/spaces">
            <Spaces />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId">
            <Space />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/task">
            <AllTasks />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/newTask">
            <NewTask />
          </PrivateRoute>
          <PrivateRoute  exact path="/new">
            <NewSpace/>
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  );
}

function PrivateComp() {
  return <h1>This is private</h1>;
}

export default App;
