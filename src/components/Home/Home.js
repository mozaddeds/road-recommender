import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import { useHistory } from 'react-router';


const Home = (props) => {

    const {Name, imgUrl} = props.vehicle;

    const history = useHistory();

    const searchOption = type => {
        const url = `/${type}/search`;
        history.push(url);
    }

    return (
        <div className="box">
            <div className="d-flex flex-column vehicleBox">
                <img src={imgUrl}></img>
                <button onClick={ () => searchOption(Name)} className="btn btn-primary m-3">{Name}</button>
            </div>
        </div>
    );
};

export default Home;