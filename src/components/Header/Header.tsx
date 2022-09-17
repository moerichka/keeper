import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "../Search";

interface IProps {
  onBurgerClick: () => void;
}

const Header: React.FC<IProps> = ({ onBurgerClick }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={onBurgerClick}
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2, color: "black" }}
        >
          <MenuIcon />
        </IconButton>
        <h6 className="h6-title">Keeper</h6>
        <Search />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
