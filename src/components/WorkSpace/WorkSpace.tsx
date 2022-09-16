import React from "react";
import s from "./workSpace.module.scss";

import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import NoteCreator from "../NoteCreator";
import ListNotes from "../ListNotes";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface IProps {
  open: boolean;
}

const WorkSpace: React.FC<IProps> = ({ open }) => {
  return (
    <Main open={open}>
      <Toolbar />
      <div className={s.content}>
        <NoteCreator />
        <ListNotes/>
      </div>
    </Main>
  );
};

export default WorkSpace;
