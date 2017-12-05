import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Track from './Components/Track'
import Tempo from './Components/Tempo'

import {synth, synthSelector, kickOptions, snareOptions} from './synth'
import {rockKickRoutes, rockSnareRoutes, rockOpenHatRoutes } from './rockKick'


import AddIcon from 'material-ui-icons/Add';
import PlayIcon from 'material-ui-icons/PlayArrow'
import Button from 'material-ui/Button';
import PauseIcon from 'material-ui-icons/Pause';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';






class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      kick: rockKickRoutes,
      snare: rockSnareRoutes,
      openHat: rockOpenHatRoutes,
      play: false,
      value: 0,
      tempo: 120
    }
  }

  clickMethod(name, instrument){
    let newRoute=[];
    switch(instrument){
      case 'kick':
        newRoute = this.state.kick
        break;
      case 'snare':
        newRoute = this.state.snare
        break;
      case 'openHat':
        newRoute = this.state.openHat
        break;
    }
    let index = newRoute.map(e=>e.value).indexOf(name)
    newRoute[index].checked = !newRoute[index].checked
    this.setState({ [instrument]: newRoute})

  }

  clickPlay(){
    this.setState({play: !this.state.play})
    this.timer()

  }

  timer(){
    let tempo = 60000/this.state.tempo
    if (!this.state.play){
      this.time = setInterval(()=> this.tick(), tempo)
    }
    else{
      clearInterval(this.time)
      this.setState({value: 0})
    }
  }

  tick(){
    let v = this.state.value
    if (v === 16){ v = 1 }
    else{ v = v + 1}
    this.setState({value: v})
  }



  kickPing(){
    let synth = synthSelector('kick', kickOptions)
    synth.triggerAttack("8n")
  }

  snarePing(){
    let synth = synthSelector('snare', snareOptions)
    synth.triggerAttackRelease("8n");

    //let synth= synthSelector('snare', snareOptions)
    //synth.start()
  }

  hatPing(){
    synth.triggerAttackRelease('C2', '16n')
  }



  handleTempo(tempo){
    this.setState({tempo: tempo})
  }

  render() {
    let value = this.state.value
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactJS-808</h1>
        </header>
        <div className="App-body">
            <Grid 
              container
              direction='column'
              justify='center'
              alignItems='center'>
              <Paper elevation={4}>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='flex-end'
                    >
                    <Grid item xs={12}>
                      <Button fab color="primary" aria-label="add" onClick={()=>this.clickPlay()}>
                        { this.state.play ? <PauseIcon/> : <PlayIcon/> }
                      </Button>
                      <Tempo tempo={this.state.tempo} onTempoChange={(value) => this.handleTempo(value)}/>
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='flex-end'
                    >
                    <Grid item xs={12}>
                      <Track 
                        routes={this.state.kick} 
                        handler={(name)=> this.clickMethod(name, 'kick')}
                        value={value} 
                        ping={()=>this.kickPing()}
                        type='Kick'/>
                    </Grid>
                    <Grid item xs={12}>
                      <Track 
                        routes={this.state.snare} 
                        handler={(value)=> this.clickMethod(value, 'snare')}
                        value={value} 
                        ping={()=>this.snarePing()}
                        type='Snare'/>
                      </Grid>
                      <Grid item xs={12}>
                      <Track 
                        routes={this.state.openHat} 
                        handler={(value)=> this.clickMethod(value, 'openHat')}
                        value={value} 
                        ping={()=>this.hatPing()}
                        type='Open Hat'/>
                      </Grid>

                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </div>
          </div>
    );
  }
}

export default App;
