import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/customer/footer/footer.component';
import { NavbarComponent } from './components/customer/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerce';

  constructor(
    private router: Router,
    // private userService: UserService,
    // private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  // ngOnInit() {
  //   this.userService.getUserProfile();

  //   this.store.pipe(select((store) => store.auth)).subscribe((user) => {
  //     this.userService.getUserProfile();
  //   });

  //   const currentPath = this.activatedRoute.snapshot.routeConfig
  //   console.log('Current path:', currentPath);

  //   console.log(this.activatedRoute.toString(),"router ----- ",this.router.routerState.snapshot)
  // }
}
