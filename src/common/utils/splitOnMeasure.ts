import { Note } from '../types/Note';
import { TimeSignatures } from '../types/TimeSignatures';
import { noteWage } from '../consts/noteWage';
import { NotesValue } from '../enums/NotesValue';

const measureObj = {
  value: NotesValue.MEASURE,
  pitch: 0,
  isSharp: false,
};

export const splitNotesOnMeasures = (
  notes: Note[],
  timeSignature: TimeSignatures,
): Note[] => {
  const notesToReturn: Note[] = [];
  let notesWageSum = 0;

  notes.forEach((note) => {
    if (notesWageSum >= 0.75) {
      notesToReturn.push(measureObj);
      notesToReturn.push(note);
      notesWageSum = noteWage[note.value];
      return;
    }

    notesToReturn.push(note);
    notesWageSum = notesWageSum + noteWage[note.value];
  });

  return notesToReturn;
};
