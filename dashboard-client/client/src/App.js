import React from 'react'
import './css/App.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class Dashboard extends React.Component {
  state = {
    data: []
  }

  getData() {
    axios.post('http://localhost:8000/', '')
    .then((response ) => {
      this.setState({data : response.data});
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
          <div>
              {this.state.data.map((d) => {
              return (
                <div class="patient-card">
                  <div class="sample-patient">
                    <div>{d.patient}</div> 
                    <Popup trigger={<div class="info"> &#9432;</div>} position="right center">
                      <div class="info-inside">This patient does not have any information</div>
                    </Popup>
                  </div>
                  <br></br>
                  <div class="sample-name">{d.sample}</div>
                  <br></br>
                  <div class="sample-machine">{d.machine}</div>
                  <br></br>
                  <div class="slider">Slider</div>
                </div>
                );
            })}
          </div>
      </div>
    )
  }
}