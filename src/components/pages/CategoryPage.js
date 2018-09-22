import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import { createCategory, fetchCategory } from '../../actions/categories';
import CategoryAddForm from '../forms/CategoryAddForm';
import CardCategory from '../common/CardCategory';

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
      loadingFetch: false,
      categories: []
  }

  componentDidMount(){
    this.handleFetchCategory();
  }

  handleCreateCategory = (payload) => this.props.createCategory(payload).then(res => res.data);

  handleFetchCategory = () => {
    this.setState({ loadingFetch: true })
    this.props.fetchCategory().then(res => {
      this.setState({ loadingFetch: false, categories: res.data })
    });
  }

  handleFormOpen = () => {
    this.setState({ openForm: true })
  }

  render(){
    const { classes } = this.props;
    const categories = this.state.categories.map((category, index) => <CardCategory category={ category } key={index} />)
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

        <CategoryAddForm openForm={ this.state.openForm } createCategory={ this.handleCreateCategory } />
      </div>
    )
  }
}

CategoryPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styledComponent = withStyles(styles)(CategoryPage);
export default connect(null, { createCategory, fetchCategory })(styledComponent);
