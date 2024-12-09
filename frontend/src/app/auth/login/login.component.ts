import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  isSignUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  role: string | null = null

  constructor(
    // private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.role = this.route.snapshot.paramMap.get("role")
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
  }

    async login() {
      try {
        const success = await this.authService.login(this.email, this.password);
    
        // Assuming success returns a user object with the role
        if (success) {
          // Check the user's role
          if (this.role === 'customer') {
            // Redirect to the home page for customers
            this.router.navigate(['/']);
          } else if (this.role === 'admin' || !this.role) {
            // Redirect to admin dashboard if the role is 'admin' or if the role is empty
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.errorMessage = "Invalid credentials or unauthorized role";
          }
        } else {
          this.errorMessage = "Invalid credentials";
        }
      } catch (e: any) {
        console.log(e);
        this.errorMessage = e.message;
      }
    }


  clearForm() {
    this.email = '';
    this.password = '';
  }
}
