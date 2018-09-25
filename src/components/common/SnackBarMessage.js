import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SnackBarMessage extends Component{

  state = {
    open: false,
    transition: null
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleTransition = (props) => <Slide direction="right" {...props} />

  render(){
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          style={{ zIndex: 10000 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transition={ this.state.transition }
          open={ this.props.open }
          autoHideDuration={ 5000 }
          onClose={ this.props.handleClose }
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={ this.props.handleClose }
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SnackBarMessage);
