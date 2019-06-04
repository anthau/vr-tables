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
    async componentWillMount() {
        this.init(this.props.station)
    }
    async init(station) {

        const Vr = new TrainTables(station, this);
        const tables = await Vr.initData()


        return tables;

    }
    render() {
        alert(JSON.stringify(this.state.dataTable));

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
            accessor: 'train' // String-based value accessors!
        },
        {
            Header: 'Target',
            accessor: 'target' // String-based value accessors!
        }
            ,
        {
            Header: 'Time',
            accessor: 'time' // String-based value accessors!
        }
        ]

        return <ReactTable
            data={this.state.dataTable}
            columns={columns}
        />

    }



}