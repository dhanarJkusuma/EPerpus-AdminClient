import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card, { CardActions, CardContent, CardMedia } from '@material-ui/core/Card';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { deleteCart, replaceStockCart } from '../../actions/transaction';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  item: {
    width: '100%'
  },
  media: {
    width: '100%',
    height: '120px'
  },
  card: {
    width: '100%',
    height: '120px',
    display: 'block'
  },
  fieldQty: {
    width: '40px',
    margin: '10px'
  },
  quantity: {
    float: 'right'
  },
  redColor: {
    color: red[700]
  }
});

class CardTransaction extends Component {
  state = {}

  handleRemove = (e) => {
    let foundInCartIndex = -1;
    let index = 0;
    this.props.cart.map(c => {
      if(c.code == this.props.book.code){
        foundInCartIndex = index;
        return;
      }
      index++;
    });

    if(foundInCartIndex >= 0){
      this.props.deleteCart(foundInCartIndex);
    }
  }

  findBook = (onChange) => {
    let index = 0;
    this.props.cart.map(c => {
      if(c.code == this.props.book.code){
        onChange(c, index);
        return;
      }
      index++;
    });
  }

  addQuantity = () => {
    this.findBook((book, index) => {
        this.handleAddQuantity(index, book);
    })
  }

  removeQuantity = () => {
    this.findBook((book, index) => {
        this.handleSubtractQuantity(index, book);
    })
  }

  handleAddQuantity = (index, foundedBook) => {
    let stock = this.props.book.stock;
    if(stock - (foundedBook.quantity + 1) >=  0){
      this.updateStockItemCart(index, foundedBook.quantity + 1);
    }else{
      this.props.showErrors(foundedBook.title + " Kosong !!!");
    }
  }

  handleSubtractQuantity = (index, foundedBook) => {
    let stock = this.props.book.stock;

    if(foundedBook.quantity - 1 > 0){
      this.updateStockItemCart(index, foundedBook.quantity - 1);
    }else{
      this.handleRemove();
    }
  }

  // Function to updating stock cart
  updateStockItemCart = (index, newStock) => {
    this.props.replaceStockCart(index, newStock);
  }

  render(){
    const { classes, theme } = this.props;
    const categories = this.props.book.categories.map((c, index) => {
      return <p key={index}>#{c.categoryName}</p>
    });
    const redColor = red[500];
    return (
      <div className={classes.item}>
        <Card className={classes.card}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
            <CardContent>
              <Typography type="headline">
                { this.props.book.title }
              </Typography>
              <Typography type="caption">

              </Typography>
            </CardContent>
            <CardActions>
              <div className={classes.quantity}>
                <Icon color="action" onClick={ this.removeQuantity }>remove_circle</Icon>
                <TextField
                  className={classes.fieldQty}
                  label="Quantity"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Placeholder"
                  value={ this.props.book.quantity }
                  disabled
                />
                <Icon color="action" onClick={ this.addQuantity }>add_circle</Icon>
              </div>
              <Button size="small" color="default" onClick={ this.handleRemove }>
                <DeleteIcon className={classes.redColor} />
              </Button>
            </CardActions>
            </Grid>
            <Grid item xs={2}>
              <CardMedia
                className={classes.media}
                image="http://localhost:8080/storage/image/no_image.jpg"
                title="Contemplative Reptile"
              />
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

CardTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  book: PropTypes.shape({
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    editor: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    totalStock: PropTypes.number.isRequired,
    createdOn: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  deleteCart: PropTypes.func.isRequired,
  replaceStockCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  showErrors: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    cart: state.cart.data
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(CardTransaction);
export default connect(mapStateToProps, {
  deleteCart,
  replaceStockCart
})(styledComponent);
