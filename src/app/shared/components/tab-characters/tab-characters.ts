import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
// Importe o componente que criamos na etapa anterior
import { FormCharacterComponent } from '../form-character/form-character'; 

@Component({
  selector: 'app-tab-characters',
  imports: [FormCharacterComponent], // Adicionado aqui!
  templateUrl: './tab-characters.html',
  styleUrls: ['./tab-characters.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabCharactersComponent {
  readonly isOwner = input(false);
  
  // Signal para controlar a exibição do modal (inicia fechado)
  readonly isModalOpen = signal(false);

  // Funções para manipular o estado do modal
  abrirModal() {
    this.isModalOpen.set(true);
  }

  fecharModal() {
    this.isModalOpen.set(false);
  }
}