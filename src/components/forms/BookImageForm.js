import React from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import SnackBarMessage from '../common/SnackBarMessage';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      width: '100%'
    },
    input: {
      display: 'none',
    },
    image: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });

class BookImageForm extends React.Component {
    
  constructor(props){
    super(props);
    let book = Object.assign({}, props.book);
    
    this.state = {
      errors: {},
      showErrors: false,
      showMessage: false,
      message: {},
      data: book,
      selectedFile: null,
      urlFile: book.coverImage,
      isUploading: false,
      percentage: 0
    };
    console.log(this.state.data)
  }

  handleClose = () => {
    this.props.handleDialogClose();
  };

  handleChangeCover = (e) => {
    let urlFile = URL.createObjectURL(e.target.files[0]);
    this.setState({
        selectedFile: e.target.files[0],
        urlFile
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isUploading: true })
    this.props.uploadCoverBook(
        this.state.data.code, 
        this.state.selectedFile, 
        (percentage) => {
            this.setState({ percentage })
        });
  }

  handleDismissMessage = () => {
    this.setState({ showMessage: false, message: {} });
  }

  handleDismissErrorMessage = () => {
    this.setState({ showErrors: false, errors: {} });
  }

  render() {
    const { classes } = this.props;
    
    
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
          <DialogTitle id="form-dialog-title">Upload Cover Book</DialogTitle>
          <DialogContent>
            <img src={ this.state.urlFile } height={100} className={ classes.image }/> 
            <br />
            <input
                accept="image/*"
                className={classes.input}
                id="raised-button-file"
                type="file"
                onChange={ this.handleChangeCover }
            />
            <label htmlFor="raised-button-file">
                <Button variant="raised" color="primary" component="span" className={classes.button}>
                    Select Image
                </Button>
            </label>
            <br />
            <LinearProgress variant="determinate" value={ this.state.percentage } />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={ this.onSubmit } color="primary">
                Upload
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BookImageForm.propTypes = {
  uploadCoverBook: PropTypes.func.isRequired,
  refreshBook: PropTypes.func.isRequired,
  book: PropTypes.object,
  handleDialogClose: PropTypes.func.isRequired
}

export default withStyles(styles)(BookImageForm);
