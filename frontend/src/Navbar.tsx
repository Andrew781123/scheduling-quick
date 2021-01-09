import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import EventIcon from "@material-ui/icons/Event";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";
import { History } from "history";

interface NavbarProps {
  history: History;
}

const Navbar: React.FC<NavbarProps> = props => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const goToHomePage = () => {
    setDrawerOpen(false);
    props.history.push("/");
  };

  const goToSetupPage = () => {
    setDrawerOpen(false);
    props.history.push("/events/new");
  };

  return (
    <div className='navbar_container'>
      <React.Fragment key='left'>
        <div className='navbar_items'>
          <IconButton
            aria-label='delete'
            className='menu_button'
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <div className='icon_container'>
            <img src='icon.png' alt='' height={55} width='auto' />
          </div>
        </div>

        <Drawer
          anchor='left'
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem button key='Home' onClick={goToHomePage}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem button key='Host event' onClick={goToSetupPage}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary='Host event' />
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default withRouter(Navbar);
