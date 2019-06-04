
import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css'
import Fetch from 'react-fetch'
import { useFetch } from "react-async"

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
    //this.setState({station_name : e.target.value})
    this.setState({ station_name: e.target.value });
  }


  render() {
    /*
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    }]
   
    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }]
   
    return <ReactTable
      data={data}
      columns={columns}
    />
    */
    return (
      <div>
    


        <form>


          <label>
            Name:
    <input onChange={this.update.bind(this)} type="text" name="name" />
          </label>
          <input type="button" value="Button" />
        </form>
        <Station render={(data) => <StationList list={data} station={this.state.station_name}     />} />

      </div>

    )
  }
}