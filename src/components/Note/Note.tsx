import React from "react";
import { INote } from "../../types/note";
import s from "./note.module.scss";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";

import MenuMore from "../MenuMore";

interface IProps {
  note: INote;
  onCompleteClick: (note: INote) => void;
  onDeleteClick: (note: INote) => void;
}

const Note: React.FC<IProps> = ({ note, onCompleteClick, onDeleteClick }) => {
  const completeClickHandler = () => {
    onCompleteClick(note);
  };

  const deleteClickHandler = () => {
    onDeleteClick(note);
  };

  const options = [{ title: "Удалить", handler: deleteClickHandler }]; // массив опций для меню

  return (
    <div className={s.card} data-is-completed={note.isCompleted}>
      <h5 className={s.title}>{note.title}</h5>
      <p className={s.text}>{note.text}</p>
      <p className={s.date}>
        {new Date(note.dateCreation).toLocaleDateString()}
      </p>
      <div className={s.completeButton} onClick={completeClickHandler}>
        {note.isCompleted ? (
          <RemoveDoneIcon className={s.deCompleteIcon} />
        ) : (
          <TaskAltIcon className={s.completeIcon} />
        )}
      </div>
      <div className={s.menuMore}>
        <MenuMore options={options} />
      </div>
    </div>
  );
};

export default Note;
