export interface INote {
  id: string;
  title: string;
  text: string;
  dateCreation: Date;
  dateExpiration?: Date;
  isCompleted?: boolean;
}

export interface IAction {
  type: "CREATE_NOTE" | "CHANGE_NOTE" | "MOVE_TO_TRASH_NOTE" | "DELETE_NOTES" ;
  payload: { newNote?: INote; id?: string };
}

export type IDispatch = (action: IAction) => void;
