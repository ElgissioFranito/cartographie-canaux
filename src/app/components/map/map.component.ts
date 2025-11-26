import { Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { CanalService } from '../../services/canal.service';
import { Canal } from '../../models/canal.model';
import { Subscription } from 'rxjs';

const homeIcon = L.icon({
    iconUrl: 'canal-icon.svg',
    iconSize: [30, 30],       // taille de l'image
    iconAnchor: [20, 40],     // point de l'image qui "touche" la carte
    popupAnchor: [0, -40]     // position du pop-up
});

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
    private map: L.Map | undefined;
    private markers: L.Marker[] = []; // Changed type to L.Marker
    private subscription: Subscription = new Subscription();

    @Output() editCanal = new EventEmitter<Canal>();
    @Output() deleteCanal = new EventEmitter<string>();
    @Output() createCanalAt = new EventEmitter<{ lat: number, lng: number }>();

    constructor(private canalService: CanalService) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {

        // Correction pour les icônes par défaut
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'assets/marker-icon-2x.png',
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png',
        });

        this.initMap();
        this.subscription.add(
            this.canalService.canals$.subscribe(canals => {
                this.updateMarkers(canals);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        if (this.map) {
            this.map.remove();
        }
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [-18.916, 47.524], // exemple : Madagascar
            zoom: 14
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© Franito ELgissio Randriamanarina'
        }).addTo(this.map);

        this.map.on('contextmenu', (e: L.LeafletMouseEvent) => {
            this.createCanalAt.emit(e.latlng);
        });

        this.map.on('popupopen', (e: L.PopupEvent) => {
            const popup = e.popup;
            const element = popup.getElement();
            if (element) {
                const editBtn = element.querySelector('.btn-edit-popup') as HTMLElement;
                const deleteBtn = element.querySelector('.btn-delete-popup') as HTMLElement;

                if (editBtn) {
                    editBtn.addEventListener('click', () => {
                        const canalId = editBtn.getAttribute('data-id');
                        const canal = this.canalService.getCanalById(canalId!);
                        if (canal) this.editCanal.emit(canal);
                        this.map?.closePopup();
                    });
                }

                if (deleteBtn) {
                    deleteBtn.addEventListener('click', () => {
                        const canalId = deleteBtn.getAttribute('data-id');
                        if (canalId && confirm('Êtes-vous sûr de vouloir supprimer ce canal ?')) {
                            this.deleteCanal.emit(canalId);
                            this.map?.closePopup();
                        }
                    });
                }
            }
        });
    }

    private updateMarkers(canals: Canal[]): void {
        if (!this.map) return;

        // Remove existing markers
        this.markers.forEach(marker => marker.remove());
        this.markers = [];

        canals.forEach(canal => {
            const marker = L.marker([canal.latitude, canal.longitude], { icon: homeIcon }); // Use L.marker with homeIcon

            marker.bindPopup(`
        <b>${canal.code}</b><br>
        Etat: ${canal.etat}<br>
        Ville: ${canal.ville} <br>
        Arrondissement: ${canal.arrondissement} <br>
        Quartier: ${canal.quartier} <br>
        Secteur: ${canal.secteur} <br><br>
        <div style="display: flex; gap: 5px;">
            <button class="btn-edit-popup" data-id="${canal.id}" style="background: #17a2b8; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Modifier</button>
            <button class="btn-delete-popup" data-id="${canal.id}" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Supprimer</button>
        </div>
      `);

            marker.addTo(this.map!);
            this.markers.push(marker);
        });
    }

    private getColor(etat: string): string {
        switch (etat) {
            case 'bon': return 'green';
            case 'moyen': return 'yellow';
            case 'mauvais': return 'orange';
            case 'critique': return 'red';
            default: return 'blue';
        }
    }
}
