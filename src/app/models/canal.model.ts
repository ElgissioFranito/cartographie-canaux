export interface Canal {
    id: string;
    code: string;
    ville: string;
    arrondissement: string;
    quartier: string;
    secteur: string;
    longitude: number;
    latitude: number;
    etat: 'bon' | 'moyen' | 'mauvais' | 'critique';
    dateDernierCurage: Date;
    responsable: string;
}
