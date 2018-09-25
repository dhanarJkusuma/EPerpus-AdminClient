import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  logoutButton: {
    bottom: true,
    marginBottom: 0
  }
});

class CardDialog extends Component{

  render(){
    const { classes } = this.props;
    const modalStyle = {
        width: '400px',
        height: '100px',
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 200px)'
    }
    return (
      <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={ true }
            >
          <div style={modalStyle} className={classes.paper}>
             <Typography type="title" id="modal-title">
               Peringatan
             </Typography>
             <Typography type="subheading" id="simple-modal-description">
               { this.props.message }
             </Typography>
             <br/>
             <br/>

            <Button color="secondary" onClick={ this.props.handleOK } className={classes.logoutButton}>
               Ya
            </Button>
            <Button color="primary" onClick={ this.props.handleClose } className={classes.logoutButton}>
              Tidak
            </Button>

           </div>
         </Modal>
      </div>
    );
  }
}

CardDialog.propType = {
  handleOK: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default withStyles(styles)(CardDialog);
