import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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


class CardCategory extends Component {
  handleUpdateEvent = () => {
    this.props.updateEvent(this.props.category);
  }

  handleDeleteEvent = () => {
    this.props.deleteEvent(this.props.category);
  }
  
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.item}>
        <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <div className={classes.column}>
             <Typography className={classes.heading}>{ this.props.category.category }</Typography>
           </div>
           <div className={classes.column}>
             <Typography className={classes.secondaryHeading}>{ this.props.category.code }</Typography>
           </div>
         </ExpansionPanelSummary>
         <ExpansionPanelActions>
            <Button color="primary" onClick={ this.handleUpdateEvent }>
              Edit
              <EditIcon className={ classes.leftIcon } />
            </Button>
            <Button color="secondary" onClick={ this.handleDeleteEvent }>
              Remove
              <DeleteIcon className={ classes.leftIcon } />
            </Button>
         </ExpansionPanelActions>
       </ExpansionPanel>
      </div>
    );
  }
}

CardCategory.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};


export default withStyles(styles, { withTheme: true })(CardCategory);
