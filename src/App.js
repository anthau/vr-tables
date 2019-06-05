
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
          <label>
            Name:
    <input onChange={this.update.bind(this)} type="text" name="name" />
          </label>
          <input type="button" value="Button" />
        </form>
        <Station render={(data) => <StationList list={data} station={this.state.station_name} />} />

      </div>

    )
  }
}