import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { DateTimePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { getCompleteHistoryTransaction } from '../../actions/transaction';
import CardTransactionStatus from '../common/CardTransactionStatus';
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
    marginTop: 40
  },
  centerLoading: {
    textAlign: "center"
  },
  card:{
    margin: 20
  }
});

class ReportPage extends Component {

  state = {
    messageDialog: "",
    showMessage: false,
    loadingFetch: false,
    fromDate: new Date(),
    toDate: new Date(),
    data: {},
    transactions: []
  }

  componentDidMount = () => {
    let data = {
      ...this.state.data,
      from: this.state.fromDate.toISOString(),
      to: this.state.toDate.toISOString()
    };
    this.setState({
      data
    });
  }

  handleFetchCompleteTransactionHistory = (start, end) => {
    this.props.getCompleteHistoryTransaction(start, end).then(res => {
      this.setState({ transactions: res });
    }).catch(err => {
      console.log(err);
    });
  }


  handleFromDate = (fromDate) => {
    let data = {
      ...this.state.data,
      from: fromDate.toISOString()
    };
    this.setState({
      fromDate,
      data
    });
  }

  handleToDate = (toDate) => {
    let data = {
      ...this.state.data,
      to: toDate.toISOString()
    };
    this.setState({
      toDate,
      data
    });
  }

  handleBookClose = () => {
    this.setState({ openBookDetail: false })
  }

  handleDialogDismiss = () => {
    this.setState({ openDialogConfirm: false, selectedTransaction: null });
  }

  handleDismissMessage = () => {
    this.setState({ showMessage: false, messageSnackBar: "" });
  }

  handleSearchHistory = () => {
    console.log(this.state.data);
    if(typeof this.state.data.from !== 'undefined' && typeof this.state.data.to !== 'undefined'){
      this.handleFetchCompleteTransactionHistory(this.state.data.from, this.state.data.to);
    }
  }

  handleApproveTransaction = () => {

  }

  render(){
    const { classes } = this.props;
    const transactions = this.state.transactions.map((transaction, index) =>
      <CardTransactionStatus
        approveTransaction={ this.handleApproveTransaction }
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
          Menu | Report Dashboard
        </Typography>
        <div className={classes.content}>

          <Card className={classes.card}>
            <CardContent>
              <Fragment>
               <div className="picker">
                 <DateTimePicker
                   label="Dari"
                   clearable
                   disableFuture
                   format="Y MMMM D HH:mm"
                   maxDateMessage="Tanggal harus kurang dari sekarang"
                   value={this.state.fromDate}
                   onChange={this.handleFromDate}
                   animateYearScrolling={false}
                 />
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <DateTimePicker
                   label="Sampai"
                   clearable
                   disableFuture
                   format="Y MMMM D HH:mm"
                   maxDateMessage="Tanggal harus kurang dari sekarang"
                   value={this.state.toDate}
                   onChange={this.handleToDate}
                   animateYearScrolling={false}
                 />
               </div>

             </Fragment>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={ this.handleSearchHistory }>Cari</Button>
            </CardActions>
          </Card>
        { content }
        </div>

      </div>
    )
  }
}

ReportPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styledComponent = withStyles(styles)(ReportPage);
export default connect(null, { getCompleteHistoryTransaction })(styledComponent);
