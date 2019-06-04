export class TrainTables {
    station = "";
    data = [];
    constructor(station) {
        
        this.station=station;
        this.initData();

    }
    async initData() {

        const axios = require('axios');
        let stationData = [];
        stationData = await axios.get('https://rata.digitraffic.fi/api/v1/live-trains/station/' +   this.station);

        stationData.data.map(train => {
            if (train.trainCategory == "Long-distance" || train.trainCategory == "Commuter") {
                this.data.push({"train"  : train.trainType + " " + train.trainNumber })
       
            }
            return 1;
        });
    }
    returnTimeTables() {
       return  this.data;
    }
}
