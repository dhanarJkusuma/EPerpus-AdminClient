import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Route, Switch } from 'react-router';
import { adminMenuItems } from '../menu/AdminMenu';
import Card, { CardContent } from '@material-ui/core/Card';
import { connect } from 'react-redux';

import CategoryPage from './CategoryPage';
import BookPage from './BookPage';
import PendingTrxPage from './PendingTrxPage';
import ReportPage from './ReportPage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/List';
import CardDialog from '../common/CardDialog';
import AuthRoute from '../routes/AuthRoute';
import { checkToken } from '../../actions/auth';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  card: {
    padding: 20
  }
});

class AdminDashboard extends React.Component {
  state = {
    open: false,
    openDialogLogout: false
  };

  componentDidMount = () => this.checkAuth();

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleExit = () => {
    this.setState({ openDialogLogout: true });
  }

  handleLogoutClose = () => {
    this.setState({ openDialogLogout: false });
  }

  checkAuth = () => {
    let token = localStorage.getItem('eLibraAdminToken');
    if(typeof token === 'undefined' || token === null){
      this.setState({ authed: false })
    }
    this.props.checkToken(token).then(res =>  {
      this.setState({ authed: true })
    }).catch(err => {
      this.setState({ authed: false })
    })
  }

  handleLogoutOpen = () => {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Library Information System | Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{adminMenuItems}</List>
          <Divider />
          <List onClick={ this.handleExit }>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <Card className={classes.card}>
              <CardContent>
                <Switch>
                  <AuthRoute authed={ this.state.authed } path='/dashboard/category' component={CategoryPage}/>
                  <AuthRoute authed={ this.state.authed } path='/dashboard/book' component={BookPage}/>
                  <AuthRoute authed={ this.state.authed } path='/dashboard/pending' component={PendingTrxPage}/>
                  <AuthRoute authed={ this.state.authed } path='/dashboard/report' component={ReportPage}/>
                  {/* when none of the above match, <NoMatch> will be rendered */}
                  <Route component={CategoryPage}/>
                </Switch>
              </CardContent>
            </Card>
          </div>

        </main>
        { this.state.openDialogLogout && <CardDialog
          open={ this.state.openDialogLogout }
          handleOpen={ this.handleLogoutOpen }
          handleClose={ this.handleLogoutClose }
          message="Apakah anda yakin ingin keluar dari aplikasi ?"
        /> } 
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  checkToken: PropTypes.func.isRequired
};

const styledComponent = withStyles(styles, { withTheme: true })(AdminDashboard);
export default connect(null, { checkToken })(styledComponent);
