import React, { useState, useRef, useContext, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import s from "./noteUpdater.module.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { INote } from "../../types/note";

interface IProps {
  note: INote;
  onClickAway?: () => void;
}

const NoteUpdater: React.FC<IProps> = ({ note, onClickAway }) => {
  const [isInitial, setIsInitial] = useState(true);
  const { dispatch } = useContext(NoteContext);
  const inputRef = useRef<any>();
  const [noteContent, setNoteContent] = useState({
    title: "",
    text: "",
  });

  useEffect(() => setNoteContent(note), [note]); // При инициализации компоненты добавляем выбранную заметку

  useEffect(() => {
    // Данный useEffect следит за изменениями инпутов и изменяет при каждом change стейт контекста
    if (noteContent.title === "" && noteContent.text === "") {
      return;
    }
    if (isInitial) {
      setIsInitial(false);
      return;
    }

    const newNote = {
      id: note.id,
      title: noteContent.title,
      text: noteContent.text,
      dateCreation: note.dateCreation,
    };

    dispatch({ type: "CHANGE_NOTE", payload: { id: note.id, newNote } });
  }, [noteContent, note]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteContent((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent) => {
    // Пока что логики не так много, поэтому на кнопку просто закрываем форму
    event.preventDefault();

    onClickAway && onClickAway();
  };

  return (
    <form className={s.noteCreator} onSubmit={submitHandler}>
      <div className={s.inputs}>
        <TextField
          id="standard-basic"
          fullWidth
          label="Заголовок"
          variant="standard"
          className={s.noteTitle}
          value={noteContent.title}
          onChange={handleChange}
          name="title"
        />
        <TextField
          id="outlined-textarea"
          label="Ваша заметка"
          fullWidth
          placeholder="Placeholder"
          multiline
          value={noteContent.text}
          onChange={handleChange}
          name="text"
          ref={inputRef}
        />
        <Button variant="contained" type="submit" className={s.button}>
          Изменить
        </Button>
      </div>
    </form>
  );
};

export default NoteUpdater;
