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
      const notCurrentNotes = notesData.filter(
        (note: INote) => note.id !== action.payload.id
      );

      localStorage.setItem(
        LOCAL_STORAGE_ITEM_NAME,
        JSON.stringify([...notCurrentNotes, action.payload.newNote])
      );
      return [...notCurrentNotes, action.payload.newNote];

    case "FILTER_NOTES":
      const filteredNotes = notesData.filter((note: INote) => {
        const title = note.title.toLowerCase();
        const text = note.text.toLowerCase();
        const searchText = action.payload.searchText?.toLowerCase() || "";
        if (searchText === "") return true;
        return title.startsWith(searchText) || text.startsWith(searchText);
      });

      return filteredNotes;

    default:
      return state;
  }
};

export default NoteReducer;
