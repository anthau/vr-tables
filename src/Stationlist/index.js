
import React from 'react';
import StatioTimeTable from "./../Table"

export default class StationList extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      
      try {
  
        let table = this.props.list.filter(train => train.name.indexOf(this.props.station) >-1 );
        let stationName="";
        if(table.length==1)   {
           stationName=(table[0].code)
           return (<StatioTimeTable station={stationName}/>);
           
          } else  {
            return (<h1></h1>);
          }   
         
      } catch (e) {
        return (<h1></h1>);
      }
  
    }
  
  }