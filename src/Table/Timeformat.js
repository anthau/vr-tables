import React from 'react';
export class Timeformat extends React.Component {
  
    render() {
        const timeR = this.props.timeR;
        const timeA = this.props.timeA;

        if (timeA.indexOf("NaN") > -1 || timeR === timeA) {
            return (<p> {timeR}</p>);
        }
        else if (timeR !== timeA) {
            return (<div>
                <p> {timeA}</p>
                <p> ({timeR})</p>
            </div>);
        }
        else {
            return (<p>{timeR}</p>)
        }
    }
}
