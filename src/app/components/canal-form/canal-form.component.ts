import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Canal } from '../../models/canal.model';
import { CanalService } from '../../services/canal.service';

@Component({
    selector: 'app-canal-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './canal-form.component.html',
    styleUrls: ['./canal-form.component.scss']
})
export class CanalFormComponent implements OnInit {
    @Input() canalToEdit: Canal | Partial<Canal> | null = null;
    @Output() formSubmit = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    canalForm: FormGroup;

    constructor(private fb: FormBuilder, private canalService: CanalService) {
        this.canalForm = this.fb.group({
            id: [''],
            code: ['', Validators.required],
            ville: ['', Validators.required],
            arrondissement: [''],
            quartier: [''],
            secteur: [''],
            longitude: [0, Validators.required],
            latitude: [0, Validators.required],
            etat: ['bon', Validators.required],
            dateDernierCurage: [new Date(), Validators.required],
            responsable: ['']
        });
    }

    ngOnInit(): void {
        if (this.canalToEdit) {
            this.canalForm.patchValue({
                ...this.canalToEdit,
                dateDernierCurage: this.canalToEdit.dateDernierCurage ? this.formatDate(this.canalToEdit.dateDernierCurage) : this.formatDate(new Date())
            });
        }

        if (!this.canalForm.get('id')?.value) {
            this.canalForm.patchValue({
                id: crypto.randomUUID()
            });
        }
    }

    private formatDate(date: Date | string): string {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }

    onSubmit(): void {
        if (this.canalForm.valid) {
            const formValue = this.canalForm.value;
            const canalData: Canal = {
                ...formValue,
                dateDernierCurage: new Date(formValue.dateDernierCurage)
            };

            if (this.canalToEdit?.id) {
                this.canalService.updateCanal(canalData);
            } else {
                this.canalService.addCanal(canalData);
            }
            this.formSubmit.emit();
            this.resetForm();
        }
    }

    onCancel(): void {
        this.cancel.emit();
        this.resetForm();
    }

    private resetForm(): void {
        this.canalForm.reset();
        this.canalToEdit = null;
    }
}
