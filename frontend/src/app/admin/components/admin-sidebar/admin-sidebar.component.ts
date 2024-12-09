import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgIf,NgFor],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  // States for collapsible subsections
  expandedSections: { [key: string]: boolean } = {
    students: false,
    teachers: false,
  };
  adminRoutes = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    {
      name: 'Categories',
      icon: '📋',
      children: [
        { name: 'Category Form', path: '/admin/category/create' },
      ],
    },
    {
      name: 'Menus',
      icon: '📋',
      children: [
        { name: 'create/view', path: '/admin/menu/create' },
      ],
    },

    {
      name: 'Agents',
      icon: '📋',
      children: [
        { name: 'create', path: 'agents/create' },

      ],
    },
    
  ];

  constructor(
    private authService:AuthService,
    private router:Router
  ) {}

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
