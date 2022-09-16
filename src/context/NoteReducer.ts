import { INote, IAction } from "../types/note";

const LOCAL_STORAGE_ITEM_NAME = "notes";

const NoteReducer = (state: INote[], action: IAction): INote[] => {
  const notesJSON = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
  const notesData = notesJSON != null ? JSON.parse(notesJSON || "") : [];

  switch (action.type) {
    case "CREATE_NOTE":
      const newNotes = [
        ...notesData,
        { ...action.payload.newNote, isCompleted: false },
      ];

      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(newNotes));

      return newNotes;

    case "CHANGE_NOTE":
      let filteredNotes = notesData.filter(
        (note: INote) =>
          note.id !== action.payload.id
      );

      localStorage.setItem(
        LOCAL_STORAGE_ITEM_NAME,
        JSON.stringify([...filteredNotes, action.payload.newNote])
      );
      return [...filteredNotes, action.payload.newNote];

    default:
      return state;
  }
};

export default NoteReducer;
