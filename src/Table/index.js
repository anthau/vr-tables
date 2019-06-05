import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css'
import { TrainTables } from './TrainTables.js';
import { Timeformat } from './Timeformat';

export default class StatioTimeTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTable: []

        }

    }

    async init(station) {

        const Vr = new TrainTables(station, this, this.props.mode);
        const tables = await Vr.initData()
        return tables;
    }

    render() {
        this.init(this.props.station);
        let type = "";

        if (this.props.mode === "ARRIVAL") {
            type = "Saapuu";
        }

        else if (this.props.mode === "DEPARTURE") {
            type = "Lähtee";
        }


        const columns = [{
            Header: 'Juna',
            accessor: 'train'
        },
        {
            Header: 'Lähtöasema',
            accessor: 'start'
        }
            ,
        {
            Header: 'Pääteasema',
            accessor: 'target'
        }
            ,
        {
            Header: type,
            accessor: 'time',
            Cell: props => <Timeformat timeR={props.value.timeR} timeA={props.value.timeA} />
        }
        ]

        return <ReactTable
            data={this.state.dataTable}
            columns={columns}
        />

    }



}