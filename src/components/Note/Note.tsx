import React from "react";
import { INote } from "../../types/note";
import s from "./note.module.scss";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";

import MenuMore from "../MenuMore";
import { IMenuOption } from "../../types/common";

interface IProps {
  note: INote;
  onCompleteClick: (note: INote) => void;
  options: IMenuOption[];
  variant?: string;
  handleToggle?: (note: INote) => void;
}

const Note: React.FC<IProps> = ({
  note,
  onCompleteClick,
  options,
  variant = "",
  handleToggle,
}) => {
  const completeClickHandler = () => {
    // Вызываем callBack функцию при клике на иконку Complete
    onCompleteClick(note);
  };
  const cardClickHandler = () => {
    // Вызываем callBack функцию при клике на текст заметки
    handleToggle && handleToggle(note);
  };

  return (
    <div
      className={s.card}
      data-is-completed={note.isCompleted}
      data-type={variant}
    >
      <h5 className={s.title} onClick={cardClickHandler}>
        {note.title}
      </h5>
      <p className={s.text} onClick={cardClickHandler}>
        {note.text}
      </p>
      <p className={s.date}>
        {new Date(note.dateCreation).toLocaleDateString()}
      </p>
      {note.dateExpiration && (
        <div className={s.dateExpirationWrapper}>
          <p>Заметка будет удалена:</p>
          <p className={s.dateExpiration}>
            {new Date(note.dateExpiration).toLocaleDateString()}
          </p>
        </div>
      )}
      <div className={s.completeButton} onClick={completeClickHandler}>
        {note.isCompleted ? (
          <RemoveDoneIcon className={s.deCompleteIcon} />
        ) : (
          <TaskAltIcon className={s.completeIcon} />
        )}
      </div>
      <div className={s.menuMore}>
        <MenuMore options={options} note={note} />
      </div>
    </div>
  );
};

export default Note;
