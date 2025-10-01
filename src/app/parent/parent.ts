import {Component, signal, TemplateRef, ViewChild} from '@angular/core';
import {GenericTableComponent} from '../generic-table-component/generic-table-component';
import {Column} from '../interfaces/column';
import {DatePipe} from '@angular/common';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [GenericTableComponent, DatePipe],
  templateUrl: './parent.html',
  styleUrl: './parent.css'
})
export class ParentComponent {
  @ViewChild('createdAtCell', { static: true })
  createdAtCell!: TemplateRef<any>;
  @ViewChild('updatedAtCell', { static: true })
  updatedAtCell!: TemplateRef<any>;

  sort = signal<Sort | undefined>(undefined);
  private dataSource = signal<any[]>([]);
  data = () => this.dataSource();

  columns: Column[] = [];

  constructor() {}

  ngOnInit(): void {
    const now = new Date();
    const days = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);
    this.dataSource.set([
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', createdAt: days(30), updatedAt: days(2) },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', createdAt: days(25), updatedAt: days(1) },
      { id: 3, name: 'Carlos Pérez', email: 'carlos@example.com', role: 'Viewer', createdAt: days(20), updatedAt: days(7) },
      { id: 4, name: 'Diana Lee', email: 'diana@example.com', role: 'Editor', createdAt: days(10), updatedAt: days(5) },
      { id: 5, name: 'Elena García', email: 'elena@example.com', role: 'Viewer', createdAt: days(5), updatedAt: days(3) },
      { id: 6, name: 'Farid Khan', email: 'farid@example.com', role: 'Admin', createdAt: days(45), updatedAt: days(15) },
      { id: 7, name: 'Grace Liu', email: 'grace@example.com', role: 'Viewer', createdAt: days(60), updatedAt: days(40) },
      { id: 8, name: 'Hiro Tanaka', email: 'hiro@example.com', role: 'Editor', createdAt: days(12), updatedAt: days(6) },
      { id: 9, name: 'Isabella Rossi', email: 'isabella@example.com', role: 'Viewer', createdAt: days(2), updatedAt: days(1) },
      { id: 10, name: 'Jamal Brown', email: 'jamal@example.com', role: 'Admin', createdAt: days(90), updatedAt: days(30) }
    ]);

    this.columns = [
      { field: 'id', label: 'ID' },
      { field: 'name', label: 'Nombre' },
      { field: 'email', label: 'Email' },
      { field: 'role', label: 'Rol' },
      { field: 'createdAt', label: 'Creado', cellRef: this.createdAtCell },
      { field: 'updatedAt', label: 'Actualizado', cellRef: this.updatedAtCell }
    ];
  }

  onSortTable(event: Sort) {
    this.sort.set(event);
    const { active, direction } = event;
    if (!direction) {
      this.dataSource.update(arr => [...arr].sort((a, b) => a.id - b.id));
      return;
    }
    const multiplier = direction === 'asc' ? 1 : -1;
    this.dataSource.update(arr => {
      return [...arr].sort((a: any, b: any) => {
        const va = a[active];
        const vb = b[active];
        const aVal = va instanceof Date ? va.getTime() : va;
        const bVal = vb instanceof Date ? vb.getTime() : vb;
        if (aVal < bVal) return -1 * multiplier;
        if (aVal > bVal) return 1 * multiplier;
        return 0;
      });
    });
  }
}
