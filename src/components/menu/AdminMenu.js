import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom'
import LabelIcon from '@material-ui/icons/Label';
import BookIcon from '@material-ui/icons/Book';
import FeedbackIcon from '@material-ui/icons/Feedback';


import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export const adminMenuItems = (
  <div>
    <ListItem component={Link} to="/dashboard/category" button>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItem>
    <ListItem component={Link} to="/dashboard/book" button>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Book" />
    </ListItem>
    <ListItem component={Link} to="/dashboard/pending" button>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="Pending" />
    </ListItem>
    <ListItem component={Link} to="/dashboard/report" button>
      <ListItemIcon>
        <PlaylistAddCheckIcon />
      </ListItemIcon>
      <ListItemText primary="Approve" />
    </ListItem>
  </div>
);
