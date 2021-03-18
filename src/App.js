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
import AllExpenses from './view/Expenses/AllExpenses'
import NewExpenses from './view/Expenses/NewExpenses'
import AllItems from './view/ShoppingList/AllItems'
import NewItem from './view/ShoppingList/NewItem'
import EditSpace from './view/Spaces/EditSpace'
import AllDocuments from './view/Documents/AllDocuments'
import NewDocument from "./view/Documents/NewDocument";
import AllChores from "./view/Chores/AllChores";
import NewChore from "./view/Chores/NewChore";


function App() {
  const date = new Date()
  const day = date.getDate()
  console.log("dia", day)
  if(day === 1){
    console.log('Es primero de mes')
  }else{
    console.log('No es primero de mes')
  }
  return (
    <div className="App">
        <NavBar/>
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
          <PrivateRoute  exact path="/spaces/:spaceId/edit">
            <EditSpace />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/expenses">
            <AllExpenses />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/expenses/newexpense">
            <NewExpenses />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/task">
            <AllTasks />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/task/newtask">
            <NewTask />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/documents">
            <AllDocuments />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/documents/newdocument">
            <NewDocument />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/shoppinglist">
            <AllItems />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/shoppinglist/newshoppinglist">
            <NewItem />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/chores">
            <AllChores />
          </PrivateRoute>
          <PrivateRoute  exact path="/spaces/:spaceId/chores/newchore">
            <NewChore />
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

export default App;
