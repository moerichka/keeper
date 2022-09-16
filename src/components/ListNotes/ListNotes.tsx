import React, { useContext, useMemo } from "react";
import { NoteContext } from "../../context/NoteContext";
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

  return (
    <div className={s.grid}>
      {notes?.map((note) => (
        <React.Fragment key={note.dateCreation.toString()}>
          <Note note={note} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListNotes;
