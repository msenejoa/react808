import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';

import '.././App.css';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

import blue from 'material-ui/colors/blue';

import Knob from 'react-canvas-knob';



const styles = {
  textField: {
    marginLeft: 8,
    marginRight: 8,
    width: 200,
  },
}



class Tempo extends React.Component{
constructor(props) {
  super(props);
  this.state = {
    value: 0,
    tempo: 0
  }
}

  handleChange(value){
    this.props.onTempoChange(value);
    this.setState({
      tempo: value,
    });
  };

  componentWillMount(){
    this.setState({
      tempo: this.props.tempo
    })
  }


  render(){
    const { classes } = this.props;
    console.log(this.state)
    return (
      <div>
      <Knob
        value={40}
        onChange={null}/>
        <TextField
          id="number"
          label="Tempo"
          value={this.state.tempo}
          onChange={(e)=>this.handleChange(e.target.value)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </div>
    );
}
}

Tempo.propTypes = {
  routes: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(Tempo);