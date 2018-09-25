import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent';

import PropTypes from 'prop-types';

import ErrorHandlerForm from '../../helpers/ErrorHandlerForm';

class CategoryForm extends React.Component {

  constructor(props){
    super(props);
    
    let category = props.category != null ? props.category : { category: "" };
    let isUpdate = props.category != null
    let oldCategoryName = isUpdate ? props.category.category : ""
    this.state = {
      errors: {},
      data: category,
      isUpdate,
      oldCategoryName
    }
  }

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
    if(this.state.isUpdate){

      if(this.state.oldCategoryName === this.state.data.category){
        this.props.handleCloseEvent();
        return;
      }

      // execute axios promise for updateing category
      this.props.updateCategory(this.state.data.code, this.state.data)
      .then((res) => {
        // empty err
        let error = {};
      
        // display message in page, when request is success
        if(res.success){
          this.props.showMessage(res.message);
          this.props.handleCloseEvent();
          this.props.handleSubmittedEvent();
          return res;
        }

        // display error field, when request is err
        this.setState({ errors: error });
        return res;
      })
      .catch((err) => {
        this.setState({ errors: err.response.errors });
        this.props.showMessage(err.response.message);
      });
      return;
    }

    // execute axios promise for creating category
    this.props.createCategory(this.state.data).then((res) => {
      let error = {};

      // fill error with empty object
      this.setState({ errors: error });

      // display message, close form, and add event after submit the data
      this.props.showMessage(res.message);
      this.props.handleCloseEvent();
      this.props.handleSubmittedEvent();
    }).catch((err) => {
      this.setState({ errors: err.response.errors });
      this.props.showMessage(err.response.message);
    });
  }

  handleClose = () => {
    this.props.handleCloseEvent();
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Dialog
          open={ true }
          onClose={ this.handleClose }
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{ this.state.isUpdate ?  "Update Category" : "Create Category" }</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="name"
              name="category"
              label="Category Name"
              type="text"
              fullWidth
              onChange={ this.onChange }
              value={ this.state.data.category }
              error={ errors && typeof errors.category !== 'undefined' }
              helperText={ errors && typeof errors.category !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.category) : "" }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.handleClose } color="primary">
              Cancel
            </Button>
            <Button onClick={ this.onSubmit } color="primary">
              { this.state.isUpdate ?  "Update" : "Create" }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


CategoryForm.propTypes = {
  createCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  category: PropTypes.object,
  handleCloseEvent: PropTypes.func.isRequired,
  handleSubmittedEvent: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired
}

export default CategoryForm;
