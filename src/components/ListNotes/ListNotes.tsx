import React, { useContext, useMemo } from "react";
import { NoteContext } from "../../context/NoteContext";
import Note from "../Note";
import s from "./listNotes.module.scss";

const ListNotes: React.FC = () => {
  const { state, dispatch } = useContext(NoteContext);

  const notes = useMemo(
    () =>
      state.sort((a, b) => a.dateCreation.getTime() - b.dateCreation.getTime()),
    [state]
  );

  return (
    <div className={s.grid}>
      {notes?.map((note) => (
        <Note note={note} />
      ))}
    </div>
  );
};

export default ListNotes;
