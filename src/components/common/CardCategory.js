import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from '@material-ui/core/ExpansionPanel';
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
  state = {

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
            <Button size="small" color="primary" onClick={ this.handleCompleteTransaction }>
             Remove
             <DeleteIcon className={classes.leftIcon} />
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
  category: PropTypes.object.isRequired
};


export default withStyles(styles, { withTheme: true })(CardCategory);
