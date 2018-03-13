import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom'
import LabelIcon from 'material-ui-icons/Label';
import BookIcon from 'material-ui-icons/Book';
import FeedbackIcon from 'material-ui-icons/Feedback';

import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck';

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
    <ListItem component={Link} to="/dashboard/waiting" button>
      <ListItemIcon>
        <PlaylistAddCheckIcon />
      </ListItemIcon>
      <ListItemText primary="Approve" />
    </ListItem>
  </div>
);

export const userMenuItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
