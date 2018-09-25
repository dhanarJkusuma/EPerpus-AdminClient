import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import ErrorHandlerForm from '../../helpers/ErrorHandlerForm';


class BookForm extends React.Component {
  

  constructor(props){
    super(props);

    let rawCategories = props.book.categories != null ? props.book.categories.map(c => c.code) : [];
    let book = Object.assign({}, props.book);
    book.categories = rawCategories;
    book.categoryCode = rawCategories;
    let oldCode = props.book.code != null ? props.book.code : "";
    let isUpdate = props.book.code != null

    this.state = {
      errors: {},
      data: book,
      selectedOptionCategories: rawCategories,
      oldCode,
      isUpdate
    };
  }

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
    if(this.state.oldCode !== ""){
      // update
      this.props.updateBook(this.state.oldCode, this.state.data).then((res) => {
        let error = {};

        this.setState({ errors: error });
        this.props.handleDialogClose();
        this.props.handleDisplayMessage(res.message);
        this.props.refreshBook();
      }).catch((err) => {
        let errors = err.data.errors;
        this.setState({ errors });
      });
      return;
    }
    // create book
    this.props.createBook(this.state.data).then((res) => {
      let error = {};

      this.setState({ errors: error });
      this.props.handleDialogClose();
      this.props.handleDisplayMessage(res.message);
      this.props.refreshBook();

    }).catch((err) => {
      let errors = err.data.errors;
      this.setState({ errors });
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
    const { errors } = this.state;
    const disablingCode = this.state.isUpdate
    return (
      <div>
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
              disabled={ disablingCode }
              value={ this.state.data.code != null ? this.state.data.code : "" }
              onChange={ this.onChange }
              error={ errors != null && typeof errors.code !== 'undefined' }
              helperText={ errors != null && typeof errors.code !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.code) : "" }
            />
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={ this.state.data.title != null ? this.state.data.title : "" }
              onChange={ this.onChange }
              error={ errors && typeof errors.title !== 'undefined' }
              helperText={ errors && typeof errors.title !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.title) : "" }
            />
            <TextField
              id="author"
              name="author"
              label="Author"
              type="text"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.author != null ? this.state.data.author : "" }
              error={ errors && typeof errors.author !== 'undefined' }
              helperText={ errors && typeof errors.author !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.author) : "" }
            />
            <TextField
              id="totalStock"
              name="totalStock"
              label="Total Stock"
              type="number"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.totalStock != null ? this.state.data.totalStock : "" }
              error={ errors && typeof errors.totalStock !== 'undefined' }
              helperText={ errors && typeof errors.totalStock !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.totalStock) : "" }
            />
            <TextField
              id="editor"
              name="editor"
              label="Editor"
              type="text"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.editor != null ? this.state.data.editor : "" }
              error={ errors && typeof errors.editor !== 'undefined' }
              helperText={ errors && typeof errors.editor !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.editor) : "" }
            />
            <TextField
              id="publisher"
              name="publisher"
              label="Publisher"
              type="text"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.publisher != null ? this.state.data.publisher : "" }
              error={ errors && typeof errors.publisher !== 'undefined' }
              helperText={ errors && typeof errors.publisher !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.publisher) : "" }
            />
            <TextField
              id="year"
              name="year"
              label="Year"
              type="number"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.year != null ? this.state.data.year : "" }
              error={ errors && typeof errors.yaer !== 'undefined' }
              helperText={ errors && typeof errors.year !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.year) : "" }
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
              { this.state.oldCode !== "" ? "Update" : "Create" }
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
  handleDialogClose: PropTypes.func.isRequired,
  handleDisplayMessage: PropTypes.func.isRequired
}

export default BookForm;
