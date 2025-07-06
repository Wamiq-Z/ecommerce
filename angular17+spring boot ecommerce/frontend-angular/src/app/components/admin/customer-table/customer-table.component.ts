import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatPaginatorModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css'
})
export class CustomerTableComponent {
  @Input() customers:any

  displayedColumns: string[] = [
    'id',
    'imageUrl',
    'firstName',
    'lastName',
    'email',
    
    
  ];

}
