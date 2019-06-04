import React from 'react';

export default class Station extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        stations: ""
  
      }
      this.init();
  
    }
    async init() {
      const axios = require('axios');
      let stationData = [];
      let stationCodes = [];
      stationData = await axios.get('https://rata.digitraffic.fi/api/v1/metadata/stations')
      // alert("huu=" + JSON.stringify(stationData))
      stationData.data.map(station => {
        if (station.passengerTraffic) {
          stationCodes.push({ com: station.passengerTraffic, code: station.stationShortCode, name: station.stationName })
        }
      });
      this.setState({ stations: stationCodes })
    }
  
    render() {
  
      return this.props.render(this.state.stations);
    }
  
  }