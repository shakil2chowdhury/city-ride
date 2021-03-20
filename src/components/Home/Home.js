import React, { useEffect, useState } from 'react';
import Vehicles from '../../fakeData/vehicles.json'
import Vehicle from '../Vehicle/Vehicle';
import './Home.css'

const Home = () => {

    //state for vehicles data load
    const [vehicles, setVehicles] = useState([]);

    useEffect(()=>
    {
        setVehicles(Vehicles);
    }, [])

    console.log(vehicles)

    return (
        <div className="vehicles-container">
            { vehicles.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>) }
        </div>
    );
};

export default Home;