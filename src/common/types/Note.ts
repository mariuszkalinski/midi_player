import { NotesValue } from '../enums/NotesValue';

export type Note = {
  pitch: number;
  value: NotesValue;
  isSharp: boolean;
};
