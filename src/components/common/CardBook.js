import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import BookIcon from 'material-ui-icons/Book';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import AssignmentReturnIcon from 'material-ui-icons/AssignmentReturn';
import DeleteIcon from 'material-ui-icons/Delete';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import classNames from 'classnames';
import Avatar from 'material-ui/Avatar';
import { ZonedDateTime, DateTimeFormatter } from 'js-joda';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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

  render(){
    const { classes, theme } = this.props;
    return (
      /*
      {
        "size": 255,
        "data": [
            {
                "code": "CRJVD3CC",
                "title": "Siksa Kubur",
                "author": "Pak Acep",
                "editor": "eko",
                "publisher": "Erlangga",
                "year": 2017,
                "stock": 4,
                "totalStock": 1,
                "createdOn": "2018-03-09",
                "categories": [
                    {
                        "code": "C201803090001",
                        "category": "religius",
                        "createdOn": "2018-03-09"
                    }
                ]
            }
        ],
        "totalPage": 1,
        "page": 0,
        "totalElements": 1
    }
      */
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
           <TableHead>
             <TableRow>
               <TableCell>Code</TableCell>
               <TableCell>Author</TableCell>
               <TableCell>Editor</TableCell>
               <TableCell>Publisher</TableCell>
               <TableCell>Year</TableCell>
               <TableCell>Stock</TableCell>
               <TableCell>Total Stock</TableCell>
               <TableCell>createdOn</TableCell>
               <TableCell>categories</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             <TableRow key={this.props.book.code}>
               <TableCell>{this.props.book.code}</TableCell>
               <TableCell>{this.props.book.author}</TableCell>
               <TableCell>{this.props.book.editor}</TableCell>
               <TableCell>{this.props.book.publisher}</TableCell>
               <TableCell>{this.props.book.year}</TableCell>
               <TableCell>{this.props.book.stock}</TableCell>
               <TableCell>{this.props.book.totalStock}</TableCell>
               <TableCell>{this.props.book.createdOn}</TableCell>
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
           <Button size="small" color="primary" onClick={ this.handleCompleteTransaction }>
            <DeleteIcon className={classes.leftIcon} />
           </Button>
         </div>
       </ExpansionPanel>
      </div>
    );
  }
}

CardBook.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired
};


export default withStyles(styles, { withTheme: true })(CardBook);
