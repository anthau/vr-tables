export class TrainTables {
    station = "";
    data = [];
    pointer = '';
    constructor(station, pointer) {
        this.station = station;
        this.pointer = pointer;
    }

    async initData() {

        const axios = require('axios');
        let stationData = [];
        stationData = await axios.get('https://rata.digitraffic.fi/api/v1/live-trains/station/' + this.station);
        stationData.data.map(train => {

            if (train.trainCategory == "Long-distance" || train.trainCategory == "Commuter") {
                const stops = train.timeTableRows;
                const lastStop = stops.slice(-1)[0];
                const target = lastStop.stationShortCode;
                try {
                const current = stops.filter(train => train.stationShortCode == this.station && train.type == "DEPARTURE")[0]

                const date1 = new Date(current.scheduledTime)

                let hours = ""
                let minutes=date1.getMinutes();
                if(minutes<10)
                    minutes="0" + minutes;

 

                    hours = date1.getHours() + ":" + minutes;
             
              

                this.data.push({ "train": train.trainType + " " + train.trainNumber, "target": target, "time": hours })
            } catch (e) {

            }
            }


            return 1;
        });

        this.pointer.setState({ dataTable: this.data })

        return this.data;
    }

}
