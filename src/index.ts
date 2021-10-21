import { Note } from './common/types/Note';
import { exampleNotes } from './songs/exampleNotes';
import { DrawNotesService } from './services/drawNotesService';
import { splitNotesOnMeasures } from './common/utils/splitOnMeasure';

type generateCanvasTagProps = {
  width: number;
  height: number;
};

const timeSignature = '3/4';

export const generateCanvasTag = ({
  width,
  height,
}: generateCanvasTagProps) => {
  const canvasElement = document.createElement('canvas');
  canvasElement.id = 'canvas';
  canvasElement.width = width;
  canvasElement.height = height;

  return canvasElement;
};

type renderNoteSheetProps = {
  elementId: string;
};

export const generateContext = ({ elementId }: renderNoteSheetProps) => {
  const node = document.getElementById(elementId);
  if (!node) return;

  const canvasElement = generateCanvasTag({ height: 800, width: 1600 });

  node.appendChild(canvasElement);

  return canvasElement.getContext('2d');
};

export const renderNoteSheet = (notes: Note[]) => {
  const ctx = generateContext({ elementId: 'notes' });
  if (!ctx) return;

  const notesSheet = new DrawNotesService(ctx, timeSignature);
  const notes2 = splitNotesOnMeasures(exampleNotes, timeSignature);
  notesSheet.renderNotes(notes2);
};

renderNoteSheet(exampleNotes);
