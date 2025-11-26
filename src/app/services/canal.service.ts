import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Canal } from '../models/canal.model';

@Injectable({
    providedIn: 'root'
})
export class CanalService {
    private canalsSubject = new BehaviorSubject<Canal[]>([]);
    canals$ = this.canalsSubject.asObservable();

    constructor() {
        this.loadInitialData();
    }

    private loadInitialData() {
        const mockCanals: Canal[] = [

            {
                id: '1',
                code: 'CAN-TANA-001',
                ville: 'Antananarivo',
                arrondissement: '1er',
                quartier: 'Analakely',
                secteur: 'Centre',
                longitude: 47.524,
                latitude: -18.916,
                etat: 'bon',
                dateDernierCurage: new Date('2023-05-01'),
                responsable: 'Rasoa Rakoto'
            },
            {
                id: '2',
                code: 'CAN-TANA-002',
                ville: 'Antananarivo',
                arrondissement: '2ème',
                quartier: 'Ambohijatovo',
                secteur: 'Nord',
                longitude: 47.520,
                latitude: -18.905,
                etat: 'moyen',
                dateDernierCurage: new Date('2023-02-10'),
                responsable: 'Andry Rajaona'
            },
            {
                id: '3',
                code: 'CAN-TANA-003',
                ville: 'Antananarivo',
                arrondissement: '3ème',
                quartier: 'Isoraka',
                secteur: 'Sud',
                longitude: 47.528,
                latitude: -18.925,
                etat: 'mauvais',
                dateDernierCurage: new Date('2022-11-15'),
                responsable: 'Lalao Ravelo'
            }
        ];
        
        this.canalsSubject.next(mockCanals);
    }

    getCanals(): Observable<Canal[]> {
        return this.canals$;
    }

    addCanal(canal: Canal): void {
        const current = this.canalsSubject.value;
        this.canalsSubject.next([...current, canal]);
    }

    updateCanal(updatedCanal: Canal): void {
        const current = this.canalsSubject.value;
        const index = current.findIndex(c => c.id === updatedCanal.id);
        if (index !== -1) {
            current[index] = updatedCanal;
            this.canalsSubject.next([...current]);
        }
    }

    deleteCanal(id: string): void {
        const current = this.canalsSubject.value;
        this.canalsSubject.next(current.filter(c => c.id !== id));
    }
}
