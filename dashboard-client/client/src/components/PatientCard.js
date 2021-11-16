import React from 'react'
import '../css/PatientCard.css';

export default class PatientCard extends React.Component {
  state = {
    data: []
  }

  render() {
    return (
      <div>
          <p> Welcome to the dashboard - testing testing :) </p>
          <div>
              {this.state.data.map((d) => {
              return (
                <div>
                  <div>Data -- {d}</div>
                  <br></br>
                </div>
                );
            })}
          </div>
      </div>
    )
  }
}