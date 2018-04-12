import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import LabelIcon from 'material-ui-icons/Label';
import BookIcon from 'material-ui-icons/Book';
import FeedbackIcon from 'material-ui-icons/Feedback';

import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck';

export const adminMenuItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Book" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="Pending Transaction" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PlaylistAddCheckIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
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
