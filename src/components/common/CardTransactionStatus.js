import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import VisibilityIcon from 'material-ui-icons/Visibility';
import PersonIcon from 'material-ui-icons/Person';
import DoneIcon from 'material-ui-icons/Done';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { ZonedDateTime } from 'js-joda';
import ResponsiveBookDialog from '../common/ResponsiveBookDialog';
import ResponsiveMemberDialog from '../common/ResponsiveMemberDialog';

const styles = theme => ({
  item: {
    width: '100%'
  },
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    margin: theme.spacing.unit,
    width: 16
  },
  chip: {
    margin: theme.spacing.unit,
  }
});

class CardTransactionStatus extends Component {

  state = {
    monthConstant : [
      'Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','November','Desember'
    ],
    openBookDetail: false,
    openMember: false,
    selectedBook: {
        code: "N/A",
        title: "N/A",
        author: "N/A",
        editor: "N/A",
        publisher: "N/A",
        categories: "N/A",
        year: 0,
        quantity: 0
    },
    member: {
        publicId: "UID",
        name: "UName",
        phone: "UPhone",
        address: "UAddress",
        email: "UEmail",
        company: "UCompany"
    },
  }

  handleClick = () => {
    this.props.approveTransaction(this.props.transaction.publicId);
  }

  handleApprove = () => {
    this.props.approveTransaction(this.props.transaction.publicId);
  }

  handleDetail = book => () => {
    this.setState({ selectedBook: book, openBookDetail: true });
  }

  handleMemberOpen = member => () => {
    this.setState({ member, openMember: true });
  }

  handleCloseDetailBook = () => {
    let initBook = {
        code: "N/A",
        title: "N/A",
        author: "N/A",
        editor: "N/A",
        publisher: "N/A",
        categories: "N/A",
        year: 0,
        quantity: 0
    };
    this.setState({ selectedBook: initBook, openBookDetail: false })
  }

  handleCloseMember = () => {
    let initMember = {
        publicId: "UID",
        name: "UName",
        phone: "UPhone",
        address: "UAddress",
        email: "UEmail",
        company: "UCompany"
    };
    this.setState({ member: initMember, openMember: false })
  }

  handleCompleteTransaction = () => {
    let now = ZonedDateTime.now().withFixedOffsetZone().toString();
    let trxId = this.props.transaction.publicId;
    let payload = {
      returnDate: now
    }
    this.props.onCompleteTransaction(trxId, payload);
  }

  render(){
    const { classes } = this.props;
    const parsedZonedDateTime = ZonedDateTime.parse(this.props.transaction.borrowDate);
    const date = parsedZonedDateTime.dayOfMonth()
    + " "
    + this.state.monthConstant[parsedZonedDateTime.monthValue()-1]
    + " "
    + parsedZonedDateTime.year()
    + " "
    + parsedZonedDateTime.hour()
    + ":"
    + parsedZonedDateTime.minute()
    + ":"
    + parsedZonedDateTime.second();


    const books = this.props.transaction.books.map((book, index) => {
      return (
        <Chip
           key={ index }
           avatar={
             <Avatar>
               { book.quantity }
             </Avatar>
           }
           label={ book.title }
           onDelete={ this.handleDetail(book) }
           className={ classes.chip }
           deleteIcon={<VisibilityIcon />}
         />
      )
    });
    const memberChip = (
      <Chip
         key={ this.props.transaction.member.publicId }
         label={ this.props.transaction.member.name }
         onDelete={ this.handleMemberOpen(this.props.transaction.member) }
         className={ classes.chip }
         deleteIcon={<PersonIcon />}
       />
    )
    const isComplete = this.props.transaction.returnDate != null && this.props.transaction.isApproved;
    var label = "Complete";
    var showActionApprove = false;
    if(!isComplete){
      const isWaitingForApprove = this.props.transaction.returnDate != null && !this.props.transaction.isApproved;
      label = isWaitingForApprove ? "Menunggu Persetujuan" : "Belum Dikembalikan";
      showActionApprove = isWaitingForApprove ? true : false;
    }
    const approveAction = (
      <Chip
        label="Setujui"
        onClick={ this.handleClick }
        onDelete={ this.handleApprove }
        className={classes.chip}
        deleteIcon={<DoneIcon />}
      />
    );
    return (
      <div className={classes.item}>
        <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <div className={classes.column}>
             <Typography className={classes.heading}>{ this.props.transaction.publicId }</Typography>
           </div>
           <div className={classes.column}>
             <Typography className={classes.secondaryHeading}>{ date }</Typography>
           </div>
           <div className={classes.column}>
             <Chip label={ label } className={classes.chip} />
           </div>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails className={classes.details}>
           <div className={classes.column}>
            { memberChip }
            { books }
           </div>
         </ExpansionPanelDetails>
         <Divider />
         <ExpansionPanelActions>
         { showActionApprove ? approveAction : "" }
         </ExpansionPanelActions>
         <Divider />
       </ExpansionPanel>

       <ResponsiveBookDialog
        open={ this.state.openBookDetail }
        book={ this.state.selectedBook }
        onClose={ this.handleCloseDetailBook }
       />

       <ResponsiveMemberDialog
        open={ this.state.openMember }
        member={ this.state.member }
        onClose={ this.handleCloseMember }
       />
      </div>
    );
  }
}

CardTransactionStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  approveTransaction: PropTypes.func.isRequired
};


export default withStyles(styles, { withTheme: true })(CardTransactionStatus);
