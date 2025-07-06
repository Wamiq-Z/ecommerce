import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-adress-card',
  standalone: true,
  imports: [],
  templateUrl: './adress-card.component.html',
  styleUrl: './adress-card.component.css'
})
export class AdressCardComponent {
  @Input() address:any
}
