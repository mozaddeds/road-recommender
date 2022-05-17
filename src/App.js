import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { createContext, useEffect, useState } from 'react';
import vehicleData from './components/Home/vehicleData.json';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Result from './components/Result/Result';

export const UserContext = createContext();

function App(props) {

  const [loggedInUser, setLoggedInUser] = useState({})

  const [vehicle, setVehicle] = useState([])
    
    useEffect(() => {
        fetch(vehicleData)
        .then(res => res.json())
        .then(vehicleData => setVehicle(vehicleData));
      }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div className="App">
          <Navbar/>
        </div>
        <Switch>
            <Route path="/login">
              <div className="m-5 p-5">
                <Login></Login>
              </div>
            </Route>
            <PrivateRoute path="/:type/search">
              <Search></Search>
            </PrivateRoute>
            <PrivateRoute path="/result/:ride">
              <Result></Result>
            </PrivateRoute>
            <Route exact path="/">
              <div className="d-flex justify-content-around m-5 p-4">
                {
                  vehicleData.map(vehicle => <Home vehicle = {vehicle}></Home> )
                }
              </div>
            </Route>
        </Switch>
        
      </Router>
    </UserContext.Provider>
  );
}

export default App;
