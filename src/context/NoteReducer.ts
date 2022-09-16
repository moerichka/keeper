import { INote, IAction } from "../types/note";

const LOCAL_STORAGE_ITEM_NAME = "notes";

const NoteReducer = (state: INote[], action: IAction): INote[] => {
  switch (action.type) {
    case "CREATE_NOTE":
      const notesJSON = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME)
      const notesData = notesJSON != null ? JSON.parse(notesJSON || "") : []

      const newNotes = [
        ...notesData,
        { ...action.payload.newNote, isCompleted: false },
      ];
      
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(newNotes));

      return newNotes;

    case "CHANGE_NOTE":
      const newState = state.filter(
        (note) => note.dateCreation !== action.payload.date
      );
      return [...newState, action.payload.newNote];

    default:
      return state;
  }
};

export default NoteReducer;
