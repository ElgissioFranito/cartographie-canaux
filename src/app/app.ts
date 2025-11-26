import { Component, signal } from '@angular/core';
import { Canal } from './models/canal.model';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { CanalListComponent } from './components/canal-list/canal-list.component';
import { CanalFormComponent } from './components/canal-form/canal-form.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MapComponent, CanalListComponent, CanalFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cartographie-canaux');

      viewMode: 'map' | 'list' = 'map';
      showForm = false;
      selectedCanal: Canal | null = null;
  
      setView(mode: 'map' | 'list'): void {
          this.viewMode = mode;
          this.showForm = false;
      }
  
      openAddForm(): void {
          this.selectedCanal = null;
          this.showForm = true;
      }
  
      openEditForm(canal: Canal): void {
          this.selectedCanal = canal;
          this.showForm = true;
      }
  
      closeForm(): void {
          this.showForm = false;
          this.selectedCanal = null;
      }
  
      onFormSubmit(): void {
          this.closeForm();
          // Optionally refresh or stay on current view
      }
}
