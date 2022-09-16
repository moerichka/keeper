import { INote } from "./note";

export type ITabName = "Заметки" | "Корзина";

export type TEmptyFunc = () => void;
export type TArgumentFunc = (note: INote) => void;

export interface IMenuOption {
  title: string;
  handler: TEmptyFunc | TArgumentFunc;
}
