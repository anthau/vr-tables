
import React from 'react';
import Station from "./Station"
import StationList from "./Stationlist"

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
        <form>
          <p>Hae asemaa nimeltä</p>
          <input onChange={this.update.bind(this)} type="text" name="name" />

          <br />

        </form>
        <Station render={(data) => <StationList list={data} station={this.state.station_name} />} />

      </div>

    )
  }
}