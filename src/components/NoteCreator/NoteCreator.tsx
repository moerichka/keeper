import React, { useState, useRef, useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import s from "./noteCreator.module.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const NoteCreator: React.FC = () => {
  const { state, dispatch } = useContext(NoteContext);
  const inputRef = useRef<any>();
  const [noteContent, setNoteContent] = useState({
    title: "",
    text: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  // При фокусе на инпут текста раскрываются остальные элементы

  const focusHandler = () => {
    setIsFocused(true);
  };

  const handleClickAway = () => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Логика onChange на инпутах
    setNoteContent((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const reset = () => {
    // После сохранения, необходимо очистить форму
    setNoteContent({ title: "", text: "" });
  };

  const submitHandler = (event: React.FormEvent) => {
    // Перехватываем submit формы и сохраняем note в массив контекста
    event.preventDefault();

    if (noteContent.title === "" && noteContent.text === "") {
      return;
    }

    const now = new Date();

    const newNote = {
      id: now.getTime().toString(),
      title: noteContent.title,
      text: noteContent.text,
      dateCreation: now,
    };

    reset();
    setIsFocused(false);
    dispatch({ type: "CREATE_NOTE", payload: { newNote } });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}> 
      <form
        className={s.noteCreator}
        data-is-focused={isFocused}
        onSubmit={submitHandler}
      >
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
            onFocus={focusHandler}
            multiline
            value={noteContent.text}
            onChange={handleChange}
            name="text"
            ref={inputRef}
          />
          <Button variant="contained" type="submit" className={s.button}>
            Сохранить
          </Button>
        </div>
      </form>
    </ClickAwayListener>
  );
};

export default NoteCreator;
