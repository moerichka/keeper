import React, { useContext, useMemo } from "react";
import { NoteContext } from "../../context/NoteContext";
import { INote } from "../../types/note";
import Note from "../Note";
import s from "./listNotesGarbage.module.scss";

const ListNotesGarbage: React.FC = () => {
  const { state, dispatch } = useContext(NoteContext); // Получаем закладки и редюсер для их изменения из контекста

  const notes = useMemo(
    () =>
      state
        .filter((note) => note.dateExpiration) // Удаляем закладки с датой удаления
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

  const onGetBackClick = (note: INote) => {
    // Функция при клике на завершение или отмену завершения карточки
    const newNote = { ...note, dateExpiration: undefined }; // Меняем у данной карточки поле isCompleted на противоположное

    dispatch({
      type: "CHANGE_NOTE",
      payload: { newNote, id: note.id },
    });
  };

  const options = [{ title: "Вернуть", handler: onGetBackClick }]; // массив опций для меню

  return (
    <div className={s.grid}>
      {notes?.map((note) => (
        <React.Fragment key={note.id}>
          <Note
            note={note}
            onCompleteClick={onCompleteClick}
            options={options}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListNotesGarbage;
