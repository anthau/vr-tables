
import React from 'react';
import StatioTimeTable from "./../Table"

export default class StationList extends React.Component {
  constructor(props) {
    super(props)


    this.state = {

      mode: "DEPARTURE",

    };
  }

  setArrival()  {
    this.setState({"mode" : "ARRIVAL"})
  }
  setDeparture()  {
    this.setState({"mode" : "DEPARTURE"})
  }

  render() {
  
    try {

      let table = this.props.list.filter(train => train.name.indexOf(this.props.station) > -1);
      let stationName = "";
     
      if (table.length === 1) {
        stationName = (table[0].code)
        return (
          <div>
            <input type="Button" onClick={()=>{this.setArrival()}} value="Saapuvat"/><input type="Button"  onClick={()=>{this.setDeparture()}} value="Lähtevät"/>
            <StatioTimeTable station={stationName} stationList={this.props.list} mode={this.state.mode} />
          </div>
        );

      } else {
        return (<p></p>);
      }

    } catch (e) {
      return (<p></p>);
    }

  }

}