import React from 'react'
import './css/App.css';
import axios from 'axios'

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
                  <div class="sample-data">Data -- {d}</div>
                  <br></br>
                </div>
                );
            })}
          </div>
      </div>
    )
  }
}