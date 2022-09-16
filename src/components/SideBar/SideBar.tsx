import React from "react";
import s from "./sideBar.module.scss";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ToolBar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITabName } from "../../types/common";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IProps {
  open: boolean;
  currentTab: ITabName;
  onTabClick: (title: ITabName) => void;
}

interface INavElement {
  title: ITabName;
  icon: any;
}

const navElements : INavElement[] = [
  { title: "Заметки", icon: <EmojiObjectsIcon /> },
  { title: "Корзина", icon: <DeleteIcon /> },
];

const SideBar: React.FC<IProps> = ({ open, onTabClick, currentTab }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <ToolBar />
      <List>
        {navElements.map((navElem, index) => (
          <ListItem
            key={navElem.title}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => onTabClick(navElem.title)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={navElem.title === currentTab}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {navElem.icon}
              </ListItemIcon>
              <ListItemText
                primary={navElem.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
