
import React from 'react';
import StatioTimeTable from "./../Table"
import './../App.css';

export default class StationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: "DEPARTURE",
      sDep: "selected",
      sArr:""
    };
  }

  setArrival()  {
    this.setState({"mode" : "ARRIVAL",sDep:"",sArr:"selected"})
  }
  setDeparture()  {
    this.setState({"mode" : "DEPARTURE",sDep:"selected",sArr:""})
  }

  render() {
  
    try {

      let table = this.props.list.filter(train => train.name.indexOf(this.props.station) > -1);
      let stationName = "";
     
      if (table.length === 1) {
        stationName = (table[0].code)
        return (
          <div>
            <input type="Button" class={this.state.sArr}  onClick={()=>{this.setArrival()}} value="Saapuvat"/><input class={this.state.sDep} type="Button"  onClick={()=>{this.setDeparture()}} value="Lähtevät"/>
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