import React, { useState } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './../App.css'

//Gets station data,

const transform = (data, allStationNames, stationName,mode) => {
   

    const fullName = (name) => { return allStationNames.filter(station => station.stationShortCode === name)[0].stationName }

    const formattTime = (time) => {

        if (time === undefined) {
            return "peruutettu"
        }
        const date1 = new Date(time);
        let hours = date1.getHours();
        let minutes= date1.getMinutes();
        hours = hours<10   ? "0" + hours: hours ;
        minutes = minutes<10   ? "0" + minutes: minutes ;

        return hours + ":" + minutes;
    }

    const transformedData = data.map(
        train => {
            const stop = train.timeTableRows.filter(station => station.type === mode && station.stationShortCode === stationName)[0];
            //liveEstimateTime

            let time = "";
            if (stop !== undefined) {

                if (stop.cancelled === true) {

                    time = "peruutettu"

                }

                else if (stop.cancelled === false && stop.differenceInMinutes === 0) {
                    time = <p>{formattTime(stop.scheduledTime)}</p>

                }
                else if (stop.cancelled === false && "" + stop.liveEstimateTime !== "" + undefined) {
                    time = <p><em class={"error"}>{formattTime(stop.liveEstimateTime)}</em><br />{formattTime(stop.scheduledTime)}</p>

                }

                else if (stop.cancelled === false && stop.differenceInMinutes !== 0 && "" + stop.liveEstimateTime === "" + undefined) {
                    time = <p><em class={"error"}>{formattTime(stop.actualTime)}</em><br />{formattTime(stop.scheduledTime)}</p>

                }


            }


            const timetableStationExists = train.timeTableRows.filter(station => station.type === mode && station.stationShortCode === stationName).length

            if (timetableStationExists !== 0 && train.timeTableRows.filter(station => station.type === mode && station.stationShortCode === stationName)[0].cancelled === false) {
                return ({
                    "time": time,
                    "train": train.trainType + ' ' + train.trainNumber,
                    "origin": fullName(train.timeTableRows[0].stationShortCode),
                    "target": fullName(train.timeTableRows.pop().stationShortCode)
                });

            }
            //empty, filtered out later
            return ({ "train": "-"});;
        }
    )
    return transformedData.filter(train => train.train!=="-");
    
}

const Station = (props) => {
   
    const axios = require('axios');
    const stationName = props.name;
    const mode = props.mode;
    const allStationNames = props.allNames
    const [data1, setData] = useState('');

    if (stationName !== '' && data1==='') {
        axios.get('https://rata.digitraffic.fi/api/v1/live-trains/station/' + stationName).then(function (response) {     
            setData(transform(response.data, allStationNames, stationName,mode));
        }).catch(function (error) {
      
            alert("virhe="  + error);
          });
    }


    const columns = [
        {
            Header: <b>Junatyyppi</b>,
            accessor: 'train'
        }
        ,
        {
            Header: <b>L&auml;ht&ouml;asema</b>,
            accessor: 'origin'
        }
        ,
        {
            Header: <b>M&auml;&auml;r&auml;asema</b>,
            accessor: 'target'
        }
        ,
        {
            Header: <b>aika</b>,
            accessor: 'time'
         
        }
    ]

    if (stationName === '' || data1 === '')
        return (<p></p>)
  
     
    return (<ReactTable
        data={data1}
        columns={columns}
        className={"-striped"}
    />)

}

export default Station;
