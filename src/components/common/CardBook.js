import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Table, { TableBody, TableCell, TableRow } from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';

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
  }
});

class CardBook extends Component {

  handleUpdate = () => {
    this.props.updateEvent(this.props.book);
  }

  handleDelete = () => {
    this.props.deleteEvent(this.props.book);
  }

  handleUpload = () => {
    this.props.uploadEvent(this.props.book);
  }

  render(){
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item  xs={12}>
        <div className={classes.item}>
          <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <div className={classes.column}>
             <Typography className={classes.heading}>{ this.props.book.title }</Typography>
           </div>
           <div className={classes.column}>
             <Typography className={classes.secondaryHeading}>{ this.props.book.code }</Typography>
           </div>
         </ExpansionPanelSummary>
         <ExpansionPanelActions>
         <Table className={classes.table}>
           <TableBody>
             <TableRow>
               <TableCell colSpan={2}>
                <img src={ this.props.book.coverImage } height="150px" />
               </TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>{this.props.book.code}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{this.props.book.title}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>{this.props.book.author}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Editor</TableCell>
                <TableCell>{this.props.book.editor}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Publisher</TableCell>
                <TableCell>{this.props.book.publisher}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>{this.props.book.year}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{this.props.book.stock}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Total Stock</TableCell>
                <TableCell>{this.props.book.totalStock}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>CreatedOn</TableCell>
                <TableCell>{this.props.book.createdOn}</TableCell>
             </TableRow>
             <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell>{this.props.book.categories.map(c => {
                 return (
                   <Chip key={c.code} label={c.category} className={classes.chip} />
                 );
               }) }</TableCell>
             </TableRow>
           </TableBody>
          </Table>
         </ExpansionPanelActions>
         <div>
           <Button size="small" color="primary" onClick={ this.handleDelete }>
            <DeleteIcon className={classes.leftIcon} />
           </Button>
           <Button size="small" color="secondary" onClick={ this.handleUpdate }>
            <EditIcon className={classes.leftIcon} />
           </Button>
           <Button size="small" color="secondary" onClick={ this.handleUpload }>
            <AddAPhotoIcon className={classes.leftIcon} />
           </Button>
         </div>
       </ExpansionPanel>
        </div>
        </Grid>
      </Grid>
    );
  }
}

CardBook.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  uploadEvent: PropTypes.func.isRequired
};


export default withStyles(styles, { withTheme: true })(CardBook);
