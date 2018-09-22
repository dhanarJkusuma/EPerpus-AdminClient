import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';

import SnackBarMessage from '../common/SnackBarMessage';

class CategoryAddForm extends React.Component {
  state = {
    openForm: false,
    errors: {},
    showErrors: false,
    showMessage: false,
    message: {}
  };

  componentWillReceiveProps(nextProps){
    this.setState({ openForm: nextProps.openForm })
  }

  handleClickOpen = () => {
    this.setState({ openForm: true });
  };

  handleClose = () => {
    this.setState({ openForm: false });
  };

  onChange = (e) => {
    this.setState({
        data: {
          ...this.state.data,
          [e.target.name]: e.target.value
        }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createCategory(this.state.data).then((res) => {
      let error = {};
      let message = { global: res.message };

      this.setState({ errors: error, message, showMessage: true, open: false });
    }).catch((err) => {
      // let statusCode = err.response.status;
    });
  }

  handleDismissMessage = () => {
    this.setState({ showMessage: false, message: {} });
  }

  handleDismissErrorMessage = () => {
    this.setState({ showErrors: false, errors: {} });
  }

  render() {
    return (
      <div>
        <SnackBarMessage
          open={ this.state.showErrors }
          handleClose={ this.handleDismissErrorMessage }
          message={ this.state.errors.global }
        />
        <SnackBarMessage
          open={ this.state.showMessage }
          handleClose={ this.handleDismissMessage }
          message={ this.state.message.global }
        />
        <Dialog
          open={ this.state.openForm }
          onClose={ this.handleClose }
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="name"
              name="category"
              label="Category"
              type="text"
              fullWidth
              onChange={ this.onChange }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CategoryAddForm.propTypes = {
  createCategory: PropTypes.func.isRequired
}

export default CategoryAddForm;
