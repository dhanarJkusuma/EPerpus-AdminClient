import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Icon from 'material-ui/Icon';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import { getAllIncompleteTransaction, approveTransaction } from '../../actions/transaction';
import CategoryAddForm from '../forms/CategoryAddForm';
import CardCategory from '../common/CardCategory';
import CardTransactionStatus from '../common/CardTransactionStatus';
import CardDialog from '../common/CardDialog';
import SnackBarMessage from '../common/SnackBarMessage';

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

class PendingTrxPage extends Component {

  state = {
      openDialogConfirm: false,
      messageDialog: "",
      messageSnackBar: "",
      showMessage: false,
      loadingFetch: false,
      selectedTransaction: null,
      transactions: []
  }

  componentDidMount(){
    this.handleFetchIncompleteTransaction();
  }

  handleFetchIncompleteTransaction = () => {
    this.props.getAllIncompleteTransaction().then(res => {
      this.setState({ transactions: res });
    }).catch(err => {

    });
  }

  handleApproveIncompleteTransaction = (transactionId) => this.props.approveTransaction(transactionId);

  handleProcessIncompleteTransaction = (transactionId) => {
    this.setState({
      selectedTransaction: transactionId,
      openDialogConfirm: true,
      messageDialog: `Apakah anda ingin menyetujui transaksi dengan ID: ${transactionId} ? `
    });
  }

  handleDialogConfirm = () => {
    this.handleApproveIncompleteTransaction(this.state.selectedTransaction).then(res => {
      // show message success
      this.setState({ showMessage: true, messageSnackBar: res.data.message });
      this.handleFetchIncompleteTransaction();
    });
    this.setState({ openDialogConfirm: false, selectedTransaction: null });
  }

  handleDialogDismiss = () => {
    this.setState({ openDialogConfirm: false, selectedTransaction: null });
  }

  handleDismissMessage = () => {
    this.setState({ showMessage: false, messageSnackBar: "" });
  }

  render(){
    const { classes } = this.props;
    const transactions = this.state.transactions.map((transaction, index) =>
      <CardTransactionStatus
        approveTransaction={ this.handleProcessIncompleteTransaction }
        transaction={ transaction }
        key={index} />
    )
    const loading = (
      <div className={classes.centerLoading}>
        <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />
      </div>
    )

    const content = this.state.loadingFetch ? loading : transactions;
    return (
      <div>
        <SnackBarMessage
          open={ this.state.showMessage }
          handleClose={ this.handleDismissMessage }
          message={ this.state.messageSnackBar }
        />

        <Typography variant="headline" component="h2">
          Pending Transaction
        </Typography>
        <div className={classes.content}>
        { content }
        </div>

        <CardDialog
          open={ this.state.openDialogConfirm }
          handleOpen={ this.handleDialogConfirm }
          handleClose={ this.handleDialogDismiss }
          message={ this.state.messageDialog }
        />

      </div>
    )
  }
}

PendingTrxPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styledComponent = withStyles(styles)(PendingTrxPage);
export default connect(null, { getAllIncompleteTransaction, approveTransaction })(styledComponent);
