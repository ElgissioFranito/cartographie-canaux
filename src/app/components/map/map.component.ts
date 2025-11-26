import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { CanalService } from '../../services/canal.service';
import { Canal } from '../../models/canal.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
    private map: L.Map | undefined;
    private markers: L.CircleMarker[] = [];
    private subscription: Subscription = new Subscription();

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
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    private updateMarkers(canals: Canal[]): void {
        if (!this.map) return;

        // Remove existing markers
        this.markers.forEach(marker => marker.remove());
        this.markers = [];

        canals.forEach(canal => {
            const color = this.getColor(canal.etat);
            const marker = L.circleMarker([canal.latitude, canal.longitude], {
                radius: 8,
                fillColor: color,
                color: '#fff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });

            marker.bindPopup(`
        <b>${canal.code}</b><br>
        Etat: ${canal.etat}<br>
        Ville: ${canal.ville} <br>
        Arrondissement: ${canal.arrondissement} <br>
        Quartier: ${canal.quartier} <br>
        Secteur: ${canal.secteur}
        <br>
        <br>
        <b>Responsable:</b> ${canal.responsable}
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
