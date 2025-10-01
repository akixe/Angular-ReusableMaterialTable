import {Component, input, OnInit, output} from '@angular/core';
import {Column} from '../interfaces/column';
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable} from '@angular/material/table';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-generic-table-component',
  imports: [MatSortModule, MatTable, MatColumnDef, MatHeaderCell, MatCell, NgTemplateOutlet, MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatRow],
  templateUrl: './generic-table-component.html',
  styleUrl: './generic-table-component.css'
})
export class GenericTableComponent implements OnInit{

  dataSource = input<any[]>([]);
  displayedColumns = input<Column[]>([]);
  sort = output<Sort>();

  headerDefs:string[] = [];

  ngOnInit(): void {
    this.headerDefs = this.displayedColumns()?.map(col => col.field)
  }

  sortData(sortEvent: Sort) {
    this.sort.emit(sortEvent);
  }
}
