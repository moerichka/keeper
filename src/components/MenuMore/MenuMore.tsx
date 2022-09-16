import React from "react";
import s from "./menuMore.module.scss";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

interface IOption {
  title: string;
  handler: () => void;
}

interface IProps {
  options: IOption[];
}

const MenuMore: React.FC<IProps> = ({ options }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Хранение значения клика
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuClickHandler = (handler: () => void) => {
    setAnchorEl(null);
    handler();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map(
          (
            option // Пробегаемся по получаемому массиву и формируем список Название - функция
          ) => (
            <MenuItem
              key={option.title}
              selected={option.title === "Pyxis"}
              onClick={() => menuClickHandler(option.handler)}
            >
              {option.title}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

export default MenuMore;
