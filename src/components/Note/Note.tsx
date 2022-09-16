import React from "react";
import { INote } from "../../types/note";
import s from "./note.module.scss";

import TaskAltIcon from "@mui/icons-material/TaskAlt";

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  return (
    <div className={s.card}>
      <h5 className={s.title}>{note.title}</h5>
      <p className={s.text}>{note.text}</p>
      <p className={s.date}>{note.dateCreation.toLocaleDateString()}</p>
      <div className={s.completeButton}>
        <TaskAltIcon className={s.completeIcon} />
      </div>
    </div>
  );
};

export default Note;
