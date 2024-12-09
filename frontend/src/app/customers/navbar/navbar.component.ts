import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cart: any[] = [];
  isLoggedIn: boolean = false;
  profileImage: string | null = null;
  userInitials: any = {}
  userId: string | null =null;
  user_first: string = ''
  isMenuOpen:boolean = false;
  showDropdown:boolean = false;
  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.userId = this.authService.currentUser?.userId
    // Load cart from localStorage
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');

    this.loadUserDetails()
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown; // Toggle dropdown visibility
  }

  toggleLogin() {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.isLoggedIn = false;
    }else{
      this.router.navigate(['/login'])
    }
  }

  async loadUserDetails(){
    try{
      if(this.userId){
        const res:any = await this.authService.getUserDetails(this.userId)
        this.userInitials = res.data;
        this.user_first = res.data?.username?.charAt(0).toLocaleUpperCase()
      }
    }catch(e){
      console.log(e);
    }
  }

}
