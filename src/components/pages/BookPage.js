import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Grid from '@material-ui/core/Grid';

import { 
  createBook, 
  fetchBook, 
  updateBook, 
  deleteBook, 
  uploadCoverBook, 
  updateUploadedCoverBook,
  searchBook
} from '../../actions/books';
import { fetchCategory } from '../../actions/categories';
import BookForm from '../forms/BookForm';
import BookImageForm from '../forms/BookImageForm';
import CardBook from '../common/CardBook';
import CardDialog from '../common/CardDialog';
import SnackBarMessage from '../common/SnackBarMessage';
import PaginationButton from '../common/PaginationButton';
import SearchForm from '../common/SearchForm';

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
      deletedBook: null,
      updatedImageCode: null,
      totalPage: 0,
      request: {
        page: 0,
        size: 15,
        query: ''
      },
      showMessage: false
  }

  componentDidMount(){
    this.handleFetchBook(0);
    this.handleFetchCategory();
  }

  /* REST Function */
  handleCreateBook = (payload) => this.props.createBook(payload).then(res => res.data);
  handleUpdateBook = (code, payload) => this.props.updateBook(code, payload).then(res => res.data);
  handleUploadCover = (book, file, callback) => this.props.uploadCoverBook(book.code, file, callback).then(res => {
    // update redux state to change the book's image directly after image uploaded
    this.props.updateUploadedCoverBook(book.code, URL.createObjectURL(file));
    return res.data;
  })
  handleFetchBook = (page) => {
    // display loading
    this.setState({ loadingFetch: true });
    // fetch with page, and fixed size
    this.props.fetchBook(page, this.state.request.size)
    .then(res => {
      this.setState({ 
        loadingFetch: false, 
        books: res.data,
        request: {
          ...this.state.request,
          page,
        },
        totalPage: res.totalPage
      })
    });
  }
  handleSearchBook = (query, page)  => {
    // display loading
    this.setState({ loadingFetch: true });
    // fetch with query, page, and fixed size
    this.props.searchBook(query, page, this.state.request.size)
      .then(res => {
        let request = {
          ...this.state.request,
          query,
          page
        };
        this.setState({
          loadingFetch: false,
          books: res.data,
          request
        });
        console.log(this.state)
      })
      .catch((err) => {
        this.handleShowMessage("Something went wrong !");
      });
  }
  handleFetchBookPagination = (query, page) => {
    if(query !== ''){
      this.handleSearchBook(query, page);
    }else{
      this.handleFetchBook(page);
    }
  }
  handleReloadFetchBook = () => {
    this.handleFetchBook(0);
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
  /* End REST Function */

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
          this.handleReloadFetchBook();
          this.handleShowMessage("Book deleted successfully !");
        }).catch((err) => {
          this.handleShowMessage("Failed to delete selected book, Something were wrong !");
        });
    }
  }

  handleDeleteCancel = () => {
    this.setState({ openConfirmDelete: false });
  }

  handleDeleteConfirmation = (book) => {
    this.setState({ openConfirmDelete: true, deletedBook: book });
  }

   /* Snackbar message */
   handleDismissMessage = () => {
    this.setState({ showMessage: false, message: "" });
  }

  handleShowMessage = (message) => {
    this.setState({ showMessage: true, message });
  }
  /* End function of Snackbar message */

  /* Init Searching Function */
  handleInitSearch = (query) => {
    this.handleFetchBookPagination(query, 0);
  }

  render(){
    const { classes } = this.props;
    let pagination = this.state.books.length > 0 ? <PaginationButton 
      page={ this.state.request.page } 
      totalPages={ this.state.totalPage } 
      onChangePage={ this.handleFetchBookPagination } 
    /> : ""
    const books = this.state.books.map((book, index) => 
      <CardBook 
        book={ book } 
        key={ index } 
        updateEvent={ () => this.handleShowUpdateForm(book) } 
        deleteEvent={ () => this.handleDeleteConfirmation(book) }
        uploadEvent={ () => this.handleShowUploadForm(book) }
        updatedImgElement={ this.state.updatedImageCode }
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
        <Grid container>
          <Grid item xs={12}>
            <SearchForm searchEvent={ this.handleInitSearch }/>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        { content }
        <br />
        <br />
        <br />
        { pagination }
        </div>

  
        { this.state.openForm && 
          <BookForm
            createBook={ this.handleCreateBook }
            updateBook={ this.handleUpdateBook }
            refreshBook={ this.handleReloadFetchBook }
            categoriesOption={this.state.categoriesOption}
            book={ this.state.selectedBook }
            handleDialogClose={ this.handleFormClose }
            handleDisplayMessage={ this.handleShowMessage }
          />
        }
        
        { this.state.openConfirmDelete && <CardDialog 
          handleOK={ this.handleDeleteOK }
          handleClose={ this.handleDeleteCancel }
          message="Apakah anda yakin ingin menghapus data ini ?"
        /> }

        { this.state.openUploadForm && <BookImageForm
          uploadCoverBook={ this.handleUploadCover }
          refreshBook={ this.handleReloadFetchBook }
          book={ this.state.selectedBook }
          handleDialogClose={ this.handleFormUploadClose }
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

BookPage.propTypes = {
  classes: PropTypes.object.isRequired,
  updateUploadedCoverBook: PropTypes.func.isRequired
};
const styledComponent = withStyles(styles)(BookPage);
export default connect(null, { 
  createBook, 
  fetchBook, 
  updateBook, 
  fetchCategory, 
  deleteBook,
  uploadCoverBook,
  updateUploadedCoverBook,
  searchBook
})(styledComponent);
