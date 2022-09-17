import React, { useContext, useMemo, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import { INote } from "../../types/note";
import s from "./listNotes.module.scss";

import Backdrop from "@mui/material/Backdrop";

import Note from "../Note";
import NoteUpdater from "../NoteUpdater";

const ListNotes: React.FC = () => {
  const { state, dispatch } = useContext(NoteContext); // Получаем закладки и редюсер для их изменения из контекста
  const [open, setOpen] = useState(false);
  const [chosenNote, setChosenNote] = useState({
    id: "",
    title: "",
    text: "",
    dateCreation: new Date(),
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (note: INote) => {
    setOpen(!open);
    setChosenNote(note);
  };

  const notes = useMemo(
    () =>
      state
        .filter((note) => !note.dateExpiration) // Удаляем закладки с датой удаления
        .sort(
          (a, b) =>
            new Date(a.dateCreation).getTime() -
            new Date(b.dateCreation).getTime()
        ), // Сортируем закладки по дате
    [state]
  );

  const onCompleteClick = (note: INote) => {
    // Функция при клике на завершение или отмену завершения карточки
    const newNote = { ...note, isCompleted: !note.isCompleted }; // Меняем у данной карточки поле isCompleted на противоположное
    dispatch({
      type: "CHANGE_NOTE",
      payload: { newNote, id: note.id },
    });
  };

  const onDeleteClick = (note: INote) => {
    // Функция вызываемая при удалении карточки, присваивая ей дату удаления через неделю
    const now = Date.now();
    const sevenDaysLater = new Date(now + 1000 * 60 * 60 * 24 * 7);

    const newNote = { ...note, dateExpiration: sevenDaysLater };
    dispatch({
      type: "CHANGE_NOTE",
      payload: { newNote, id: note.id },
    });
  };

  const options = [{ title: "Удалить", handler: onDeleteClick }]; // массив опций для меню

  return (
    <div className={s.grid}>
      {notes?.map((note) => (
        <React.Fragment key={note.id}>
          <Note
            note={note}
            onCompleteClick={onCompleteClick}
            options={options}
            handleToggle={handleToggle}
          />
        </React.Fragment>
      ))}
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <div className={s.noteUpdater}>
            <NoteUpdater note={chosenNote} onClickAway={handleClose} />
          </div>
          <div className={s.background} onClick={handleClose} />
        </Backdrop>
      </div>
    </div>
  );
};

export default ListNotes;
