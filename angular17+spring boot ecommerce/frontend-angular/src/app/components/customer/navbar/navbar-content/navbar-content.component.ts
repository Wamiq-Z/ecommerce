import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { navigation } from './navbarMenu';

@Component({
  selector: 'app-navbar-content',
  standalone: true,
  imports: [],
  templateUrl: './navbar-content.component.html',
  styleUrl: './navbar-content.component.css'
})
export class NavbarContentComponent {


  @Input()
  selectedSection!: string;


  category:any;

  ngOnInit() {
    
  }
  
  constructor(private router:Router){
    this.category=navigation
  }

  navigateToProducts=(path:String)=>{
    console.log("not implemented----")
    this.router.navigate([path])
    
  }


}
