import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';

import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography';

import SnackBarMessage from '../common/SnackBarMessage';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class BookAddForm extends React.Component {
  state = {
    openForm: false,
    errors: {},
    showErrors: false,
    showMessage: false,
    message: {},
    data: {
      totalStock: 0,
      stock: 0,
      categoryCode: []
    },
    selectedOptionCategories: []
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
    this.props.createBook(this.state.data).then((res) => {
      let error = {};
      let message = { global: res.message };

      this.props.refreshBook();
      this.setState({ errors: error, message, showMessage: true, openForm: false });
    }).catch((err) => {
      let statusCode = err.response.status;
    });
  }

  handleDismissMessage = () => {
    this.setState({ showMessage: false, message: {} });
  }

  handleDismissErrorMessage = () => {
    this.setState({ showErrors: false, errors: {} });
  }

  handleSelect = (selectedOption) => {
    let categories = selectedOption.split(',');
    let selectedOptionCategories = selectedOption;

    this.setState({
      data: {
        ...this.state.data,
        categoryCode: categories
      },
      selectedOptionCategories
    });
  }

  removeSelected = () => {

  }

  render() {
    const categoriesOption = this.props.categoriesOption;
    const value = this.state.selectedOptionCategories && this.state.selectedOptionCategories.value;
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
          <DialogTitle id="form-dialog-title">Create Book</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="code"
              name="code"
              label="Code"
              type="text"
              fullWidth
              onChange={ this.onChange }
            />
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              onChange={ this.onChange }
            />
            <TextField
              id="author"
              name="author"
              label="Author"
              type="text"
              fullWidth
              onChange={ this.onChange }
            />
            <TextField
              id="totalStock"
              name="totalStock"
              label="Total Stock"
              type="number"
              fullWidth
              onChange={ this.onChange }
            />
            <TextField
              id="editor"
              name="editor"
              label="Editor"
              type="text"
              fullWidth
              onChange={ this.onChange }
            />
            <TextField
              id="publisher"
              name="publisher"
              label="Publisher"
              type="text"
              fullWidth
              onChange={ this.onChange }
            />
            <TextField
              id="year"
              name="year"
              label="Year"
              type="number"
              fullWidth
              onChange={ this.onChange }
            />
            <br/>
            <br/>
            <br/>
            <div>
            <Typography variant="title">
              Category
            </Typography>
              <Select
      					closeOnSelect={false}
      					multi
                name="categories"
      					onChange={this.handleSelect }
      					options={ categoriesOption }
      					placeholder="Pilih kategori"
                removeSelected={this.state.removeSelected}
      					simpleValue
      					value={ this.state.selectedOptionCategories }
      				/>
            </div>
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

BookAddForm.propTypes = {
  createBook: PropTypes.func.isRequired,
  refreshBook: PropTypes.func.isRequired
}

export default BookAddForm;
