import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { createCategory, fetchCategory, updateCategory, deleteCategory } from '../../actions/categories';
import CategoryForm from '../forms/CategoryForm';
import CardCategory from '../common/CardCategory';
import SnackBarMessage from '../common/SnackBarMessage';
import CardDialog from '../common/CardDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  content: {
    marginTop: 100
  },
  centerLoading: {
    textAlign: "center"
  }
});

class CategoryPage extends Component {

  state = {
      openForm: false,
      openConfirmDelete: false,
      loadingFetch: false,
      categories: [],
      selectedUpdateCategory: null,
      showMessage: false,
      message: "",
      deleteCategory: null
  }

  componentDidMount(){
    this.handleFetchCategory();
  }

  /* Rest Function */
  handleCreateCategory = (payload) => this.props.createCategory(payload).then((res) => res.data);
  handleUpdateCategory = (code, payload) => this.props.updateCategory(code, payload).then((res) => res.data);
  handleFetchCategory = () => {
    this.setState({ loadingFetch: true })
    this.props.fetchCategory().then(res => {
      this.setState({ loadingFetch: false, categories: res.data });
    });
  };
  handleDeleteCategory = (code) => this.props.deleteCategory(code);
  /* End Rest Function */


  /* Form Create Function */
  handleFormOpen = () => {
    this.setState({ openForm: true });
  }
  handleFormClose = () => {
    this.setState({ selectedUpdateCategory: null, openForm: false });
  }
  /* End Form Create Function */

  /* Form Update Function */
  handleUpdateFormOpen = (category) => {
    this.setState({ selectedUpdateCategory: category, openForm: true });
  }
  handleUpdateFormClose = () => {
    this.setState({ selectedUpdateCategory: null, openForm: false });
  }
  /* End Form Update Function */

  /* Snackbar message */
  handleDismissMessage = () => {
    this.setState({ showMessage: false, message: "" });
  }

  handleShowMessage = (message) => {
    this.setState({ showMessage: true, message });
  }
  /* End function of Snackbar message */

  /* Delete Confirmation Dialog function */
  handleShowDeleteConfirmation = (category) => {
    this.setState({ deleteCategory: category, openConfirmDelete: true });
  }

  handleProceedDelete = () => {
    if(this.state.deleteCategory === null){
      this.handleAbortDelete();
      return;
    }
    this.handleDeleteCategory(this.state.deleteCategory.code)
      .then((res) => {
        this.setState({ openConfirmDelete: false });
        this.handleShowMessage("Category deleted successfully. ");
        this.handleFetchCategory();
      })
      .catch((err) => {
        this.handleShowMessage(err.response.data.message);
      });
  }

  handleAbortDelete = () => {
      this.setState({ deleteCategory: null, openConfirmDelete: false });
  }
  /* End Delete Confirmation Dialog function */

  render(){
    const { classes } = this.props;
    const categories = this.state.categories.map((category, index) => <CardCategory 
      category={ category } 
      key={ index } 
      updateEvent={ () => this.handleUpdateFormOpen(category) }
      deleteEvent={ () => this.handleShowDeleteConfirmation(category) }
    />)
    const loading = (
      <div className={classes.centerLoading}>
        <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />
      </div>
    )

    const content = this.state.loadingFetch ? loading : categories;
    return (
      <div>
        <Typography variant="headline" component="h2">
          Menu | Category Management Dashboard
        </Typography>
        <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={ this.handleFormOpen }>
          <AddIcon />
        </Button>

        <div className={classes.content}>
        { content }
        </div>

        { this.state.openForm && <CategoryForm 
          createCategory={ this.handleCreateCategory }
          updateCategory={ this.handleUpdateCategory } 
          handleCloseEvent={ this.handleFormClose }
          handleSubmittedEvent={ this.handleFetchCategory }
          category={ this.state.selectedUpdateCategory }
          showMessage={ this.handleShowMessage }
          /> }

        { this.state.openConfirmDelete && <CardDialog 
          handleOK={ this.handleProceedDelete }
          handleClose={ this.handleAbortDelete }
          message="Do you really want to delete this data ?"
        /> }

        
        <SnackBarMessage
          open={ this.state.showMessage }
          handleClose={ this.handleDismissMessage }
          message={ this.state.message }
        />

      </div>
    )
  }
}

CategoryPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styledComponent = withStyles(styles)(CategoryPage);
export default connect(null, { 
  createCategory, 
  fetchCategory, 
  updateCategory,
  deleteCategory
})(styledComponent);
