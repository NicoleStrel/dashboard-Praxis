import React from 'react'
import './css/App.css';
import axios from 'axios';

//popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

//slider
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

//spinner/checkmark
import Spinner from 'react-bootstrap/Spinner';
import { Checkmark } from 'react-checkmark';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      performance_getData: []
    };
  }

  getData() {
    var start = performance.now();

    axios.post('http://localhost:8000/', '')
    .then((response ) => {
      let data=response.data.map((d, i) =>{
        let time = this.state.data.length > 0 ? this.state.data[i].currtime: 0;
        return {...d, currtime: time};
      })
      this.setState({data: data});
    })
    var end = performance.now();
    
    // record performance test
    var p = this.state.performance_getData;
    p.push(end - start);
    this.setState({ performance_getData: p});
    if (p.length === 100) {
      console.log("Performance getData() over 100 trials: ", p.reduce((a, b) => a + b, 0)/100)
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getData(), 1000);
    this.timer = setInterval(() => this.setCurrentTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.timer);
  }

  setCurrentTime() {
    var data = this.state.data;
    data.forEach(d => {
      if (d.start === "1"){
        d.currtime = d.currtime + 1;
      }
    });

    this.setState({data: data});
  }

  getMarks(max) {
    var marks = {};
    marks[0] = '0%';
    marks[max/4] = '25%';
    marks[max/2] = '50%';
    marks[3*max/4] = '75%';
    marks[max] = '100%';
    return marks
  }

  render() {
    const hasData = this.state.data.length >0;
   
    return (
      <div>
          <div>
              {hasData ? (
              this.state.data.map((d, i) => {
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
                  <div class="slider">
                      {d.time === "0" ? (
                        <Slider
                        value={100}
                        trackStyle={{ backgroundColor: '#50DCC3', height: 30, transform: 'translateY(-25%)' }} 
                        railStyle={{backgroundColor: '#ffffff'}}
                        marks ={{0:'0%', 25: '25%', 50:"50%", 75:"75%", 100:"100%"}}
                        dotStyle={{ display: 'none' }}
                        handleStyle={{ display: 'none' }}/>
                        
                      ) : (
                        <Slider 
                          max={d.time} 
                          value={d.currtime} 
                          marks ={this.getMarks(parseInt(d.time))}
                          trackStyle={{ backgroundColor: '#50DCC3', height: 30, transform: 'translateY(-25%)' }} 
                          railStyle={{backgroundColor: '#ffffff'}}
                          handleStyle={{ display: 'none' }}
                          dotStyle={{ display: 'none' }}/>
                      )}
                  </div>
                  <div className="state">
                    {d.currtime >= d.time ? (
                      <Checkmark size='32px' color='#50DCC3'/>
                    ) : (
                      <Spinner animation="border" role="status" style={{color: '#50DCC3'}}></Spinner>
                    )}
                  </div>
                </div>
                )} 
               ) ) : ( <div class="no-data">There are no samples being processed currently</div>)
              }
          </div>
      </div>
    )
  }
}