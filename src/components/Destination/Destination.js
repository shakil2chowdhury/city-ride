import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Destination.css'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GroupIcon from '@material-ui/icons/Group';
import Maps from '../Maps/Maps';
import Vehicles from '../../fakeData/vehicles.json'

const Destination = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(()=>
    {
        setVehicles(Vehicles);
    }, [])
    const [from, setfrom] = useState('');
    const [destination, setDestination] = useState('');
    const handleBlur = (e) => {

        if (e.target.name === 'from') {
            if(e.target.value !== ''){
                setfrom(e.target.value)
            }
        }
        if (e.target.name === 'destination') {
            if(e.target.value !== ''){
                setDestination(e.target.value)
            }
        }
    }
    const { ride } = useParams();
    return (
        <div className="destination-body">
            {from && destination ? <div className="destination-sidebar">
                <div className="destination-final">
                    <p><MyLocationIcon style={{ color: "white" }} />   {from}</p>
                    <p><LocationOnIcon style={{ color: "white" }} />   {destination}</p>
                </div>
                
                    { vehicles.map(vehicle => (vehicle.vehicle === ride) ? <div className="available-rides"><img src="https://i.postimg.cc/fSn7wzqk/bike.png"></img><p>{vehicle.name}</p><p><GroupIcon /> {vehicle.capacity}</p><p>{vehicle.price}</p></div> : <br />)}

            </div> : <div className="destination-sidebar">
                    <input name="from" type="text" placeholder="From" onBlur={handleBlur}/>
                    <br />
                    <input type="text" name="destination" placeholder="Destination" onBlur={handleBlur}/>
                    <br />
                    <br />
                    <Button variant="contained" color="primary">
                        Search
                    </Button>
            </div>}
            <div className="destination-map"><Maps></Maps></div>
        </div>
    );
};

export default Destination;