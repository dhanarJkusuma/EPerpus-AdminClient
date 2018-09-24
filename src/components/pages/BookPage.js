import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { createBook, fetchBook, updateBook, deleteBook, uploadCoverBook } from '../../actions/books';
import { fetchCategory } from '../../actions/categories';
import BookForm from '../forms/BookForm';
import BookImageForm from '../forms/BookImageForm';
import CardBook from '../common/CardBook';
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

class BookPage extends Component {
  state = {
      openForm: false,
      openUploadForm: false,
      loadingFetch: false,
      books: [],
      categoriesOption: [],
      selectedBook: null,
      openConfirmDelete: false,
      deletedBook: null
  }

  componentDidMount(){
    this.handleFetchBook();
    this.handleFetchCategory();
  }

  handleCreateBook = (payload) => this.props.createBook(payload).then(res => {
    this.setState({ openForm: false })
    return res.data;
  });

  handleUpdateBook = (code, payload) => this.props.updateBook(code, payload).then(res => {
    this.setState({ openForm: false });
    return res.data;
  });

  handleUploadCover = (code, file, callback) => this.props.uploadCoverBook(code, file, callback).then(res => {
    this.setState({ openUploadForm: false });
    return res.data;
  })

  handleFetchBook = () => {
    this.setState({ loadingFetch: true });
    this.props.fetchBook().then(res => {
      this.setState({ loadingFetch: false, books: res.data })
    });
  }

  handleFetchCategory = () => {
    this.props.fetchCategory().then(res => {
      let categoriesOption = res.data.map(c => (
      {
        value: c.code,
        label: c.category
      }
      ));
      this.setState({ loadingFetch: false, categoriesOption })
    });
  }

  handleCleanOpenForm = () => {
    this.setState({ openForm: true, selectedBook: {} });
  }

  handleShowUpdateForm = (book) => {
      this.setState({ selectedBook: book, openForm: true});
  }

  handleShowUploadForm = (book) => {
    this.setState({ selectedBook: book, openUploadForm: true });
  }

  handleFormClose = () => {
    this.setState({ openForm: false });
  }

  handleFormUploadClose = () => {
    this.setState({ openUploadForm: false });
  }

  handleDeleteOK = () => {
    // Delete
    if(this.state.deletedBook != null){
      this.props.deleteBook(this.state.deletedBook.code)
        .then(() => {
          this.setState({ openConfirmDelete: false });
          this.handleFetchBook();
        }).catch((err) => {
          console.log(err);
        });
    }
    
  }

  handleDeleteCancel = () => {
    this.setState({ openConfirmDelete: false });
  }

  handleDeleteConfirmation = (book) => {
    this.setState({ openConfirmDelete: true, deletedBook: book });
  }

  render(){
    const { classes } = this.props;
    const books = this.state.books.map((book, index) => 
      <CardBook 
        book={ book } 
        key={index} 
        updateEvent={ () => this.handleShowUpdateForm(book) } 
        deleteEvent={ () => this.handleDeleteConfirmation(book) }
        uploadEvent={ () => this.handleShowUploadForm(book) }
    />)
    const loading = (
      <div className={classes.centerLoading}>
        <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />
      </div>
    )

    const content = this.state.loadingFetch ? loading : books;
    return (
      <div>
        <Typography variant="headline" component="h2">
          Menu | Book Management Dashboard
        </Typography>
        <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={ this.handleCleanOpenForm }>
          <AddIcon />
        </Button>

        <div className={classes.content}>
        { content }
        </div>

  
        { this.state.openForm && 
          <BookForm
            createBook={ this.handleCreateBook }
            updateBook={ this.handleUpdateBook }
            refreshBook={ this.handleFetchBook }
            categoriesOption={this.state.categoriesOption}
            book={ this.state.selectedBook }
            handleDialogClose={ this.handleFormClose }
          />
        }
        
        { this.state.openConfirmDelete && <CardDialog 
          handleOpen={ this.handleDeleteOK }
          handleClose={ this.handleDeleteCancel }
          message="Apakah anda yakin ingin menghapus data ini ?"
        /> }

        { this.state.openUploadForm && <BookImageForm
          uploadCoverBook={ this.handleUploadCover }
          refreshBook={ this.handleFetchBook }
          book={ this.state.selectedBook }
          handleDialogClose={ this.handleFormUploadClose }
        /> }
      </div>
    )
  }
}

BookPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styledComponent = withStyles(styles)(BookPage);
export default connect(null, { 
  createBook, 
  fetchBook, 
  updateBook, 
  fetchCategory, 
  deleteBook,
  uploadCoverBook
})(styledComponent);
