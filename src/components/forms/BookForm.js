import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core/Dialog';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';

import SnackBarMessage from '../common/SnackBarMessage';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class BookForm extends React.Component {
  

  constructor(props){
    super(props);
    let rawCategories = props.book.categories != null ? props.book.categories.map(c => c.code) : [];
    let book = Object.assign({}, props.book);
    book.categories = rawCategories;
    book.categoryCode = rawCategories;
    let oldCode = props.book.code != null ? props.book.code : "";

    this.state = {
      openForm: false,
      errors: {},
      showErrors: false,
      showMessage: false,
      message: {},
      data: book,
      selectedOptionCategories: rawCategories,
      oldCode
    };
    console.log(this.state.data)
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.book != null){
  //     this.setState({ data: nextProps.book });
  //   }
  //   this.setState({ openForm: nextProps.openForm });
  // }

  // handleClickOpen = () => {
  //   this.setState({ openForm: true });
  // };

  handleClose = () => {
    this.props.handleDialogClose();
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
    if(this.state.oldCode != ""){
      // update
      this.props.updateBook(this.state.oldCode, this.state.data).then((res) => {
        let error = {};
        let message = { global: res.message };
  
        this.props.refreshBook();
        this.setState({ errors: error, message, showMessage: true, openForm: false });
      }).catch((err) => {
        // let statusCode = err.response.status;
      });
      return;
    }
    // create book
    this.props.createBook(this.state.data).then((res) => {
      let error = {};
      let message = { global: res.message };

      this.props.refreshBook();
      this.setState({ errors: error, message, showMessage: true, openForm: false });
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
    // const value = this.state.selectedOptionCategories && this.state.selectedOptionCategories.value;
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
          open={ true }
          onClose={ this.handleClose }
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{ this.state.data != null ? "Create Book": "Edit Book" }</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="code"
              name="code"
              label="Code"
              type="text"
              fullWidth
              value={ this.state.data.code != null ? this.state.data.code : "" }
              onChange={ this.onChange }
            />
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={ this.state.data.title != null ? this.state.data.title : "" }
              onChange={ this.onChange }
            />
            <TextField
              id="author"
              name="author"
              label="Author"
              type="text"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.author != null ? this.state.data.author : "" }
            />
            <TextField
              id="totalStock"
              name="totalStock"
              label="Total Stock"
              type="number"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.totalStock != null ? this.state.data.totalStock : "" }
            />
            <TextField
              id="editor"
              name="editor"
              label="Editor"
              type="text"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.editor != null ? this.state.data.editor : "" }
            />
            <TextField
              id="publisher"
              name="publisher"
              label="Publisher"
              type="text"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.publisher != null ? this.state.data.publisher : "" }
            />
            <TextField
              id="year"
              name="year"
              label="Year"
              type="number"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.year != null ? this.state.data.year : "" }
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
              { this.state.oldCode != "" ? "Update" : "Create" }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BookForm.propTypes = {
  createBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  refreshBook: PropTypes.func.isRequired,
  book: PropTypes.object,
  handleDialogClose: PropTypes.func.isRequired
}

export default BookForm;
