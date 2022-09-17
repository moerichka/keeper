import React, { useEffect, useState, useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import s from "./search.module.scss";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const SearchMui = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid",
  borderColor: alpha(theme.palette.common.black, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.black, 1),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 1),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search: React.FC = () => {
  const { state, dispatch } = useContext(NoteContext);
  const [isInitial, setIsInitial] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // При изменении поля поиска, мы обращаемся к контексту и фильтруем его значения по совпадению первых символов
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    dispatch({ type: "FILTER_NOTES", payload: { searchText } });
  }, [searchText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <SearchMui>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchText}
        onChange={handleChange}
        type="search"
        placeholder="Искать…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchMui>
  );
};

export default Search;
