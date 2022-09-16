import React, { useContext, useMemo } from "react";
import { NoteContext } from "../../context/NoteContext";
import { INote } from "../../types/note";
import Note from "../Note";
import s from "./listNotes.module.scss";

const ListNotes: React.FC = () => {
  const { state, dispatch } = useContext(NoteContext);

  const notes = useMemo(
    () =>
      state.sort(
        (a, b) =>
          new Date(a.dateCreation).getTime() -
          new Date(b.dateCreation).getTime()
      ),
    [state]
  );

  const onCompleteClick = (note: INote) => {
    const newNote = { ...note, isCompleted: !note.isCompleted };
    dispatch({
      type: "CHANGE_NOTE",
      payload: { newNote, id: note.id },
    });
  };

  return (
    <div className={s.grid}>
      {notes?.map((note) => (
        <React.Fragment key={note.id}>
          <Note note={note} onCompleteClick={onCompleteClick} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListNotes;
