import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  counter = 0;
  slogan = 'Go X';
  button!: HTMLButtonElement;
  cells!: HTMLTableCellElement[];

  marker(event: MouseEvent) {
    this.button = document.querySelector('button') as HTMLButtonElement;
    this.button.style.pointerEvents = 'auto';

    this.cells = document.querySelectorAll('td') as unknown as HTMLTableCellElement[];

    const targetCell = event.target as HTMLTableCellElement;
    if (targetCell.textContent || this.isWinner(this.cells)) return;
    targetCell.textContent = ['X', 'O'][this.counter++ % 2];
    targetCell.style.pointerEvents = 'none';

    this.slogan = `Next: ${['X', 'O'][this.counter % 2]}`;

    if (this.isWinner(this.cells)) {
      this.cells.forEach(cell => cell.style.pointerEvents = 'none');
      this.slogan = `Winner: ${targetCell.textContent}`;
    } else if (this.counter === 9) {
      this.cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
        cell.style.backgroundColor = '#04456b';
      });
      this.slogan = 'Win-Win!';
    }
  }

  isWinner(cells: HTMLTableCellElement[]) {
    const winningCombs = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let comb of winningCombs) {
      if (
        cells[comb[0]].textContent === cells[comb[1]].textContent &&
        cells[comb[0]].textContent === cells[comb[2]].textContent &&
        cells[comb[0]].textContent !== ''
      ) {
        [cells[comb[0]], cells[comb[1]], cells[comb[2]]].forEach(cell => cell.style.backgroundColor = '#04456b');
        return true;
      }
    }
    return false;
  }

  startAgain() {
    this.counter = 0;
    this.slogan = 'Go X';
    this.button.style.pointerEvents = 'none';
    this.cells.forEach(cell => {
      cell.textContent = '';
      cell.style.backgroundColor = '';
      cell.style.pointerEvents = 'auto';
    });
  }
}
