import {TemplateRef} from '@angular/core';

export interface Column{
  field: string;
  cellRef?: TemplateRef<any|undefined>;
  label: string
}
