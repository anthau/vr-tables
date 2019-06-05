
import React from 'react';
import Station from "./Station"
import StationList from "./Stationlist"
import './App.css';

export default class Stations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      station_name: ""
    }
  }

  update(e) {
    this.setState({ station_name: e.target.value });
  }

  render() {
    return (
      <div>
        <div class={"header"}>
          <p>Aseman junatiedot</p>

        </div>
        <p>Hae asemaa nimeltä</p>
        <input onChange={this.update.bind(this)} type="text" name="name" />
        <br />
        <Station render={(data) => <StationList list={data} station={this.state.station_name} />} />

      </div>

    )
  }
}