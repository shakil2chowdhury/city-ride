import React from 'react';
import { useHistory } from 'react-router';
import './Vehicle.css';

const Vehicle = (props) => {
    const {vehicle, vehicleImg} = props.vehicle;
    const history = useHistory()
    const handleRide = (ride) => {
        history.push(`/destination/${ride}`);
    }
    return (
        <div className="single-vehicle" onClick={() => handleRide(vehicle)}>
            <img src={vehicleImg} alt=""/>
            <p>{vehicle}</p>
        </div>
    );
};

export default Vehicle;