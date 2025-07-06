import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../Models/AppState';
import { Store, createSelector, select } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthComponent } from '../../auth/auth.component';
import { UserService } from '../../../state/User/user.service';
import { NavbarContentComponent } from './navbar-content/navbar-content.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavbarContentComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isProfileMenuOpen: boolean = false;
  userProfile: any;

  dialogRef?: MatDialogRef<AuthComponent>;

  private userProfileSubscription: Subscription;

  selectUser = createSelector(
    (state: AppState) => state.user,
    (user) => user
  );

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.userProfileSubscription = this.store
    .pipe(select((store: AppState) => store.user))
    .subscribe((user) => {
      console.log("user profile 2", user);
      this.userProfile = user.userProfile;

      if (user.userProfile) {
        this.dialog.closeAll(); // Close all dialogs when user profile is available
      }
    });
  }

  handleProfileMenuOpen() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    console.log('handle profile menu -------- ');
  }

  handleProfileMenuClose() {
    this.isProfileMenuOpen = false;
  }

  openLoginModal(): void {
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false,
    });
  }

  navigateToCart = () => {
    this.router.navigate(['cart']);
  };

  ngOnInit() {
    if (localStorage.getItem('jwt')) this.userService.getUserProfile();
    console.log("user profile",this.userProfile);
    // this.store.select("user");
    // console.log("slect",this.store.select("user"))
    this.store
      .pipe(select((store: AppState) => store.user))
      .subscribe((user) => {
        console.log("user profile 2",user);
        this.userProfile = user.userProfile;
       
        if (user.userProfile) {
          this.dialog.closeAll();
        }
      });
  }

  dispatchGetUserProfileAction = () => {
    // this.store.dispatch(getUserProfile());
    this.userService.getUserProfile();
  };

  handleLogout = () => {
    console.log('logout success');
    this.userService.logout();
    this.router.navigate(["/"])
  };

  open: boolean = false;
  selectedTabIndex: number = 0;

  setOpen(open: boolean): void {
    this.open = open;
  }

  isNavbarContentOpen = false;
  currentSection!: string;

  openNavbarContent(section: string) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
    console.log('currentSection section ', this.currentSection);
  }

  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }
  navigateTo(path: any) {
    this.router.navigate([path]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector('.modal-container');
    const openButtons = document.querySelectorAll('.open-button');

    let clickedInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickedInsideButton = true;
      }
    });

    if (modalContainer && !clickedInsideButton && this.isNavbarContentOpen) {
      console.log(
        'container ---------------------- ',
        this.isNavbarContentOpen
      );
      this.closeNavbarContent();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.userProfileSubscription.unsubscribe();
  }
}
