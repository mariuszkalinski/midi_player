import { Note } from '../common/types/Note';
import { NotesValue } from '../common/enums/NotesValue';
import { TimeSignatures } from '../common/types/TimeSignatures';

export class DrawNotesService {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private timeSignature: TimeSignatures,
  ) {}

  private renderTimeSignature = () => {
    this.ctx.font = '25px arial';
    this.ctx.fillText(this.timeSignature[0], 40, 30);
    this.ctx.fillText(this.timeSignature[2], 40, 50);
  };

  private renderTrebleClef = () => {
    this.ctx.font = '80px arial';
    this.ctx.fillText('𝄞', 10, 60);
  };

  private renderFullNote = (pitch: number, index: number) => {
    const x = index * 40 + 80;
    const y = 65 + pitch * -5;

    this.ctx.beginPath();
    this.ctx.ellipse(x, y, 8, 5, 0, 0, 50);
    this.ctx.stroke();
  };

  private renderHalfNote = (pitch: number, index: number) => {
    const x = index * 40 + 80;
    const y = 65 + pitch * -5;

    this.ctx.fillRect(x + 7, y - 40, 1, 40);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, 8, 5, 0, 0, 50);
    this.ctx.stroke();
  };

  private renderQuarterNote = (pitch: number, index: number) => {
    const x = index * 40 + 80;
    const y = 65 + pitch * -5;

    this.ctx.fillRect(x + 7, y - 40, 1, 40);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, 8, 5, 0, 0, 50);
    this.ctx.stroke();
    this.ctx.fill();
  };

  private renderEighthNote = (pitch: number, index: number) => {
    const x = index * 40 + 80;
    const y = 65 + pitch * -5;

    this.ctx.fillRect(x + 7, y - 40, 1, 40);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, 8, 5, 0, 0, 50);
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.moveTo(x + 8, y - 40);
    this.ctx.quadraticCurveTo(x + 8, y - 40, x + 15, y - 35);
    this.ctx.quadraticCurveTo(x + 25, y - 25, x + 25, y - 15);
    this.ctx.quadraticCurveTo(x + 25, y - 15, x + 15, y - 28);
    this.ctx.quadraticCurveTo(x + 15, y - 28, x + 8, y - 33);

    this.ctx.stroke();
    this.ctx.fill();
  };

  private renderStave = () => {
    this.ctx.fillStyle = 'rgb(0, 0, 0)';

    this.ctx.fillRect(0, 10, 1600, 1);
    this.ctx.fillRect(0, 20, 1600, 1);
    this.ctx.fillRect(0, 30, 1600, 1);
    this.ctx.fillRect(0, 40, 1600, 1);
    this.ctx.fillRect(0, 50, 1600, 1);
  };

  private renderMeasure = (pitch: number, index: number) => {
    const x = index * 40 + 80;
    const y = 50;

    this.ctx.fillRect(x + 7, y - 40, 1, 40);

    this.ctx.stroke();
  };

  public readonly renderNotes = (notes: Note[]) => {
    this.renderStave();
    this.renderTrebleClef();
    this.renderTimeSignature();

    const noteValuesRendersMap = {
      [NotesValue.TH8]: this.renderEighthNote,
      [NotesValue.HALF]: this.renderHalfNote,
      [NotesValue.QUARTER]: this.renderQuarterNote,
      [NotesValue.TH16]: this.renderFullNote,
      [NotesValue.WHOLE]: this.renderFullNote,
      [NotesValue.MEASURE]: this.renderMeasure,
    };

    notes.forEach((note, index) => {
      note.value;
      noteValuesRendersMap[note.value](note.pitch, index);
    });
  };
}
