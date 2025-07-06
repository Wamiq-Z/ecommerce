import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-order-tracker',
  standalone: true,
  imports: [CommonModule,MatDivider],
  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.css'
})
export class OrderTrackerComponent {
  @Input() activeStep: any
  @Input() steps:any
}
