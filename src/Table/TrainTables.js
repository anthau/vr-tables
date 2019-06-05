export class TrainTables {
    station = "";
    data = [];
    pointer = '';
    constructor(station, pointer) {
        this.station = station;
        this.pointer = pointer;
      
    }

    async initData() {
        const stationCodes = this.pointer.props.stationList;
        const axios = require('axios');
        let stationData = [];
        stationData = await axios.get('https://rata.digitraffic.fi/api/v1/live-trains/station/' + this.station);
        stationData.data.map(train => {

            if (train.trainCategory == "Long-distance" || train.trainCategory == "Commuter") {

                const stops = train.timeTableRows;
                const lastStop = stops.slice(-1)[0];
                const target = lastStop.stationShortCode;
                const startPoint = train.timeTableRows[0];
                const startPointStation = stationCodes.filter(station => station.code == startPoint.stationShortCode)[0].name;  ;
                const realName = stationCodes.filter(station => station.code == target)[0].name;

                try {
                    const current = stops.filter(train => train.stationShortCode == this.station && train.type == "DEPARTURE")[0];

                
                    const date1 = new Date(current.scheduledTime)
                    let hours = date1.getHours();

                    if (hours < 10)
                        hours = "0" + hours;

                    let minutes = date1.getMinutes();
                    if (minutes < 10)
                        minutes = "0" + minutes;

                    const time = hours + ":" + minutes;
                    this.data.push({ "train": train.trainType + " " + train.trainNumber, "target": realName,"start" : startPointStation, "time": time })
                } catch (e) {

                }
               
            }


            return 1;
        });

        this.pointer.setState({ dataTable: this.data })

        return this.data;
    }

}
