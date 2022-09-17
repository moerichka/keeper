import React from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IMenuOption, TArgumentFunc, TEmptyFunc } from "../../types/common";
import { INote } from "../../types/note";

const ITEM_HEIGHT = 48;

interface IProps {
  options: IMenuOption[];
  note: INote;
}

const MenuMore: React.FC<IProps> = ({ options, note }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Хранение значения клика
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuClickHandler = (handler: TEmptyFunc | TArgumentFunc) => {
    setAnchorEl(null);
    handler(note);
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
