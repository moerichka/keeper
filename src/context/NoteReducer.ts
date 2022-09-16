import { INote, IAction } from "../types/note";

const NoteReducer = (state: INote[], action: IAction): INote[] => {
  switch (action.type) {
    case "CREATE_NOTE":
      return [
        ...state,
        {
          ...action.payload.newNote,
          isCompleted: false,
        },
      ];
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
