import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import { createBook, fetchBook } from '../../actions/books';
import { fetchCategory } from '../../actions/categories';
import BookAddForm from '../forms/BookAddForm';
import CardBook from '../common/CardBook';


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
      loadingFetch: false,
      books: [],
      categoriesOption: []
  }

  componentDidMount(){
    this.handleFetchBook();
    this.handleFetchCategory();
  }

  handleCreateBook = (payload) => this.props.createBook(payload).then(res => {
    this.setState({ openForm: false })
    return res.data;
  });

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

  handleFormOpen = () => {
    this.setState({ openForm: true })
  }

  render(){
    const { classes } = this.props;
    const books = this.state.books.map((book, index) => <CardBook book={ book } key={index} />)
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
        <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={ this.handleFormOpen }>
          <AddIcon />
        </Button>

        <div className={classes.content}>
        { content }
        </div>

        <BookAddForm
          openForm={ this.state.openForm }
          createBook={ this.handleCreateBook }
          refreshBook={ this.handleFetchBook }
          categoriesOption={this.state.categoriesOption}
          />
      </div>
    )
  }
}

BookPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styledComponent = withStyles(styles)(BookPage);
export default connect(null, { createBook, fetchBook, fetchCategory })(styledComponent);
