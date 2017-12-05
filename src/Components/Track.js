import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Radio from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import '.././App.css';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

import blue from 'material-ui/colors/blue';

import synth from './../synth'


const styles = {
  checkedActive: {
    color: green[500]
  },
  checkedInactive: {
    color: green[200]
  },
  default: {
    color: blue[500]
  },
  defaultActive: {
    color: red[500]
  }
}

class Track extends React.Component{
constructor(props) {
  super(props);
  this.state = {
    value: 0,
    type: '',
    open: false
  }
}

  componentWillMount(){
    this.setState({type: this.props.type})
  }

  componentWillReceiveProps(newProps){
    let v = newProps.value % 17
    this.setState({value: v})
  }

  handleClickOpen(){
    console.log('open')
    this.setState({open: true})
  }

  handleClickClose(){
    this.setState({ open: false})
  }

  someMethod(){
   this.props.ping()
  }


  render(){
    const { classes } = this.props;
    return (
      <div >
        <span><Button onClick={()=>this.handleClickOpen()}>{this.state.type}</Button></span>
        {this.props.routes.map((route, index) =>(
          <span key={index}>
          <Radio
            key={index}
            checked={route.checked}
            value={route.value}
            name={route.name}
            onClick={(e)=> this.props.handler(e.target.value)}
            classes={{
              checked: (route.number===this.state.value)?classes.checkedActive:classes.checkedInactive,
              default: (route.number===this.state.value)?classes.defaultActive:classes.default
            }}
            />

              {(route.checked & route.number===this.state.value) ? this.someMethod(): null}
              {((index+1)%4 == 0) ? <span style={{display:'inline-block', width: '20px'}}></span>
            
            : null}
          </span>
          ))}

        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{this.state.type}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> this.handleClickClose()} color="primary">
              Disagree
            </Button>
            <Button onClick={()=>this.handleClickClose()} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>



      </div>
    );
}
}

Track.propTypes = {
  routes: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(Track);