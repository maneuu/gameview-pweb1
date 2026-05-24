import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrls: ['./searchbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {

  termo = '';

  @Output()
  buscar = new EventEmitter<string>();

  pesquisar(): void {
    this.buscar.emit(this.termo);
  }
}