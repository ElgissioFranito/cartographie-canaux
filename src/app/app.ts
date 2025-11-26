import { Component, signal } from '@angular/core';
import { Canal } from './models/canal.model';
import { CanalService } from './services/canal.service';
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
    selectedCanal: Partial<Canal> | null = null;

    constructor(private canalService: CanalService) { }

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

    onCreateCanalAt(coords: { lat: number, lng: number }): void {
        this.selectedCanal = {
            latitude: coords.lat,
            longitude: coords.lng,
            etat: 'bon', // default
            dateDernierCurage: new Date()
        };
        this.showForm = true;
    }

    onDeleteCanal(id: string): void {
        this.canalService.deleteCanal(id);
    }

    closeForm(): void {
        this.showForm = false;
        this.selectedCanal = null;
    }

    onFormSubmit(): void {
        this.closeForm();
        // refresh or stay on current view
        console.log(this.canalService.getCanals());
    }
}
