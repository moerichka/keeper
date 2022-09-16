export interface INote {
  title: string;
  text: string;
  dateCreation: Date;
  isCompleted?: boolean;
}

export interface IAction {
  type: "CREATE_NOTE" | "CHANGE_NOTE" | "MOVE_TO_TRASH_NOTE" | "DELETE_NOTES";
  payload: { newNote: INote; date?: Date };
}

export type IDispatch = (action: IAction) => void;
