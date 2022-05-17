import React, { createContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './Search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import vehicleData from '../Home/vehicleData.json';
import Result from '../Result/Result';

export const PlaceContext = createContext();

const Search = () => {
    const [searchPlace, setSearchPlace] = useState({
        from: '',
        to: ''
    })

    const [route, setRoute] = useState({
        from: '',
        to: ''
    })

    const {type} = useParams();
    let ride;

    vehicleData.map(vehicle => {
        
        if(vehicle.Name === type) {
            ride = vehicle.Name;
        }
    })

    console.log(vehicleData);

    let content = false;

    const handleBlur = (event => {
        const newSearchPlace = {...searchPlace}
        newSearchPlace[event.target.name] = event.target.value;
        setSearchPlace(newSearchPlace);
    })

    const history = useHistory();

    const resultPage = rideOption => {
        const url = `/result/${rideOption}`;
        history.push(url);
        content = true;
      }

    const handleClick = (event) => {
        if (searchPlace.from && searchPlace.to) {
            setRoute(searchPlace);
            console.log(searchPlace, " && ", route);
        }
    }

    return (
        <PlaceContext.Provider value={[route, setRoute]}>
            {!content? <div className="d-flex flex-column searchField">
                <div className="inputArea">
                    <h4>From</h4>
                    <input onBlur={handleBlur} name="from" id="fromField" type="text" placeholder="Type Your Starting Point" />
                </div>
                <div className="inputArea">
                    <h4>To</h4>
                    <input onBlur={handleBlur} name="to" id="toField" type="text" placeholder="Type Your Destination Point" />
                </div>
                <div className="inputArea">
                    <h4>Date</h4>
                    <input onBlur={handleBlur} name="to" id="dateField" type="date" />
                </div>
                <button onMouseEnter={handleClick} onClick={() => resultPage(ride)} className="checkBtn btn btn-success btn-outline-info btn-lg m-3">Check</button>
            </div> :
            <Result></Result> }
        </PlaceContext.Provider>
    );
};

export default Search;