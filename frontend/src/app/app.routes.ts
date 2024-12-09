import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './gaurds/auth.gaurd';
import { AdminGaurd } from './gaurds/admin.gaurds';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { MenuFormComponent } from './admin/pages/menu/menu-form/menu-form.component';
import { CategoryManagementComponent } from './admin/pages/category/category-management/category-management.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './customers/pages/home/home.component';
import { CartComponent } from './customers/pages/cart/cart.component';
import { HistoryComponent } from './customers/pages/history/history.component';
import { AgentCreateComponent } from './admin/pages/agents/agent-create/agent-create.component';
import { AssignAgentComponent } from './admin/pages/agents/assign-agent/assign-agent.component';
import { LocationUpdateComponent } from './admin/pages/agents/location-update/location-update.component';

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'login/:role',component: LoginComponent},
    {path: 'register',component: RegisterComponent},

    {path:'',
        component:CustomersComponent,
        children: [
            {path: '',component:HomeComponent},
            {path: 'cart',component: CartComponent},
            {path: 'history',component: HistoryComponent},


            // {path: 'menu/create',component: MenuFormComponent},
            // {path: 'menu/edit/:menuId',component: MenuFormComponent},

            // {path: 'category/create',component: CategoryManagementComponent},
            // {path: 'category/edit/:categoryId',component: CategoryManagementComponent},
        ]
    },

    // admin routes
    {path:'admin',
        component:AdminComponent,
        canActivate: [AuthGaurd,AdminGaurd],
        children: [
            {path: 'dashboard',component: DashboardComponent},

            {path: 'menu/create',component: MenuFormComponent},
            {path: 'menu/edit/:menuId',component: MenuFormComponent},

            {path: 'category/create',component: CategoryManagementComponent},
            {path: 'category/edit/:categoryId',component: CategoryManagementComponent},

            {path: 'agents/create',component: AgentCreateComponent},
            {path: 'agents/assign-order/:agentId',component: AssignAgentComponent},
            {path: 'agents/location/:agentId',component:LocationUpdateComponent},


        ]
    },

    {path: '**',redirectTo: '/login',pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserModule],
    exports: [RouterModule],
    providers: [NgModel]
})
export class AppRoutingModule {}
