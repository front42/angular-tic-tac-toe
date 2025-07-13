import { Component, ElementRef, QueryList, ViewChildren, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [],
})
export class AppComponent {
  protected counter: WritableSignal<number> = signal(0);
  protected gameOver: WritableSignal<boolean> = signal(false);
  protected slogan: WritableSignal<string> = signal('Tic-Tac-Toe');
  @ViewChildren('cell') protected cells!: QueryList<ElementRef<HTMLTableCellElement>>;

  constructor() {}

  protected mark(cell: HTMLTableCellElement) {
    cell.textContent = ['X', 'O'][this.counter() % 2];
    cell.classList.add('disabled');

    this.counter.update((value) => value + 1);
    this.slogan.set(`Next ${['X', 'O'][this.counter() % 2]}`);

    const cells = this.cells.map((elRef: ElementRef) => elRef.nativeElement);

    if (this.isWinner(cells)) {
      this.gameOver.set(true);
      this.slogan.set(`Winner ${cell.textContent}`);
    } else if (this.counter() === 9) {
      cells.forEach((cell) => cell.classList.add('winning'));
      this.gameOver.set(true);
      this.slogan.set('Win-Win!');
    }
  }

  protected isWinner(cells: HTMLTableCellElement[]) {
    const winningCombs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let comb of winningCombs) {
      if (
        cells[comb[0]].textContent === cells[comb[1]].textContent &&
        cells[comb[0]].textContent === cells[comb[2]].textContent &&
        cells[comb[0]].textContent !== ''
      ) {
        [cells[comb[0]], cells[comb[1]], cells[comb[2]]].forEach((cell) => cell.classList.add('winning'));
        return true;
      }
    }
    return false;
  }

  protected reset() {
    this.counter.set(0);
    this.gameOver.set(false);
    this.slogan.set('Tic-Tac-Toe');
    this.cells.forEach((cell) => {
      cell.nativeElement.textContent = '';
      cell.nativeElement.classList.remove('disabled', 'winning');
    });
  }
}
