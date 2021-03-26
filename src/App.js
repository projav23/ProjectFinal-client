import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./view/Auth/Login";
import Signup from "./view/Auth/SignUp";
import Home from "./view/Home/Home";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AnonRoute from "./components/Routes/AnonRoute";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Spaces from "./view/Spaces/Spaces";
import NewSpace from "./view/Spaces/NewSpace";
import Space from "./view/Space/Space";
import AllTasks from "./view/Tasks/AllTasks";
import AllExpenses from "./view/Expenses/AllExpenses";
import AllItems from "./view/ShoppingList/AllItems";
import EditSpace from "./view/Spaces/EditSpace";
import AllDocuments from "./view/Documents/AllDocuments";
import AllChores from "./view/Chores/AllChores";
import MyCalendar from "./view/Calendar/Calendar";
import NotFound from "./view/NotFound/NotFound";

function App() {
  const [showNav, setShowNav] = React.useState(true);

  const toggleMenu = () => {
    setShowNav(!showNav);
  };


  return (
    <div className="App">
      {showNav && <NavBar />}
      <Switch>
        <AnonRoute exact path="/login">
          <Login toggle={toggleMenu} />
        </AnonRoute>
        <AnonRoute exact path="/signup">
          <Signup toggle={toggleMenu} />
        </AnonRoute>
        <PrivateRoute exact path="/spaces">
          <Spaces />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId">
          <Space />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId/edit">
          <EditSpace />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId/expenses">
          <AllExpenses />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId/task">
          <AllTasks />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId/documents">
          <AllDocuments />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId/shoppinglist">
          <AllItems />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId/chores">
          <AllChores />
        </PrivateRoute>
        <PrivateRoute exact path="/spaces/:spaceId/calendar">
          <MyCalendar />
        </PrivateRoute>
        <PrivateRoute exact path="/new">
          <NewSpace />
        </PrivateRoute>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="">
          <NotFound toggle={toggleMenu}/>
        </Route>
        <Route path="*">
          <NotFound toggle={toggleMenu}/>
        </Route>
        <Route >
          <NotFound toggle={toggleMenu}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
