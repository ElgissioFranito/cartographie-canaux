import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanalService } from '../../services/canal.service';
import { Canal } from '../../models/canal.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-canal-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './canal-list.component.html',
    styleUrls: ['./canal-list.component.scss']
})
export class CanalListComponent implements OnInit {
    canals$: Observable<Canal[]>;
    @Output() edit = new EventEmitter<Canal>();

    constructor(private canalService: CanalService) {
        this.canals$ = this.canalService.canals$;
    }

    ngOnInit(): void { }

    onEdit(canal: Canal): void {
        this.edit.emit(canal);
    }

    onDelete(id: string): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce canal ?')) {
            this.canalService.deleteCanal(id);
        }
    }
}
