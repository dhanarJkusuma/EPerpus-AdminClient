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
    const { classes, theme } = this.props;
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
