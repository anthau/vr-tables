
import React, { useState } from 'react'
import Station from "./Station"
import './App.css';

const Stations =  () => {
    const [tempStationName, settempstationName] = useState('');
    const [allStationData, setallstationData] = useState('');
    const [type, setType] = useState('ARRIVAL');
    const [stationData, setstationData] = useState('');
    const axios = require('axios');

    // Get the shortnames of stations
    const getInfo = (name) => {
        axios.get('https://rata.digitraffic.fi/api/v1/metadata/stations').then(function (response) {
            const data1 = ((response.data.filter(station => station.passengerTraffic === true && station.stationName.indexOf(name) > -1)))
            setallstationData(response.data);
            setstationData(data1[0].stationShortCode)
        })
    }

    const test = (e) => { settempstationName(e.target.value); }
    var uniqid = require('uniqid');
    return (
        <div>
        <div class={"header"}>
            <p>Aseman junatiedot</p> 
        </div>
        <p></p>
        <p>Hae asemaa nimeltä</p>
        <input onChange={test} type="text" name="name" />
            <input onClick={() => { getInfo(tempStationName) }} type="button" name="update" value="update" />
            <p>  <b>{tempStationName} </b> {type}</p>
            <input onClick={() => { setType('ARRIVAL') }} type="button" name="update" value="Saapuvat" />
            <input onClick={() => { setType('DEPARTURE') }} type="button" name="update" value="Lähtevät" /> <br/>

            <Station key={uniqid()} name={stationData} allNames={allStationData} mode={type} />

        <br />
    </div>)
}

export default Stations;
