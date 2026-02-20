import { Routes } from '@angular/router';
import {authGuard} from "./Guards/auth-guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./Pages/home/home.page').then((m) => m.HomePage),
    canMatch: [authGuard]
  },

  {
    path: 'orders',
    loadComponent: () => import('./Pages/order-pending/order-pending.page').then( m => m.OrderPendingPage),
    canMatch: [authGuard]
  },
  {
    path: 'shipments-details',
    loadComponent: () => import('./Pages/shipments-details/shipments-details.page').then( m => m.ShipmentsDetailsPage),
    canMatch: [authGuard]
  },
  {
    path: 'payslip-details/:id',
    loadComponent: () => import('./Pages/payslip-details/payslip-details.page').then( m => m.PayslipDetailsPage),
    canMatch: [authGuard]
  },
  {
    path: 'payslip',
    loadComponent: () => import('./Pages/payslip/payslip.page').then( m => m.PayslipPage),
    canMatch: [authGuard]
  },
  {
    path: 'edit-user',
    loadComponent: () => import('./Pages/edit-user/edit-user.page').then( m => m.EditUserPage),
    canMatch: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./Pages/login/login.page').then( m => m.LoginPage)
  },
];
