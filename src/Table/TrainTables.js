export class TrainTables {
    station = "";
    data = [];
    pointer = '';
    mode=''

    constructor(station, pointer,mode) {
        
        this.station = station;
        this.pointer = pointer;
        this.mode=mode;
      
    }

    async initData() {

        const stationCodes = this.pointer.props.stationList;
        const axios = require('axios');
        let stationData = [];
        stationData = await axios.get('https://rata.digitraffic.fi/api/v1/live-trains/station/' + this.station);
   
        stationData.data.map(train => {

            if (train.trainCategory === "Long-distance" || train.trainCategory === "Commuter") {

                const stops = train.timeTableRows;
                const lastStop = stops.slice(-1)[0];
                const target = lastStop.stationShortCode;
                const startPoint = train.timeTableRows[0];
                const startPointStation = stationCodes.filter(station => station.code === startPoint.stationShortCode)[0].name;  ;
                const realName = stationCodes.filter(station => station.code === target)[0].name;

                try {

                    const current = stops.filter(train => train.stationShortCode === this.station && train.type === this.mode)[0];
                    const timetableTime = new Date(current.scheduledTime)
                    const actualTime=new Date(current.actualTime)
                    const time = formatTime(timetableTime);
                    const aTime = formatTime(actualTime);
                    this.data.push({ "train": train.trainType + " " + train.trainNumber, "target": realName,"start" : startPointStation, "time": {"timeR" : time, "timeA" :aTime , "cancelled" : train.cancelled} , "timeA" : aTime})
             
                } catch (e) {

                }
            
            }
            return 1;
        });
    

    
       this.pointer.setState({ dataTable: this.data })

        return this.data;
    }

}
function formatTime(timetableTime) {
    let hours = timetableTime.getHours();
    if (hours < 10)
        hours = "0" + hours;
    let minutes = timetableTime.getMinutes();
    if (minutes < 10)
        minutes = "0" + minutes;
    const time = hours + ":" + minutes;
    return time;
}

