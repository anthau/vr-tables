import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css'
import { TrainTables } from './TrainTables.js';

export default class StatioTimeTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTable: []

        }

    }

    async init(station) {

        const Vr = new TrainTables(station, this,this.props.mode);
        const tables = await Vr.initData()
        return tables;
    }
    render() {
      

        this.init(this.props.station);
        let type="";

        if(this.props.mode==="ARRIVAL")  {
            type="Saapuu";
        }

        else if(this.props.mode==="DEPARTURE")  {
            type="Lähtee";
        }




        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23,
            }
        }]

        const columns = [{
            Header: 'Juna',
            accessor: 'train' // String-based value accessors!
        },
        {
            Header: 'Lähtöasema',
            accessor: 'start' // String-based value accessors!
        }
            ,
        {
            Header: 'Pääteasema',
            accessor: 'target' // String-based value accessors!
        }
        ,
        {
            Header: type,
            accessor: 'time' // String-based value accessors!
        }
        ]

        return <ReactTable
            data={this.state.dataTable}
            columns={columns}
        />

    }



}