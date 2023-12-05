import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'terms',
    pathMatch: 'full'
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/auth/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./pages/auth/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/auth/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-profile-pic',
    loadChildren: () => import('./pages/userSettings/change-profile-pic/change-profile-pic.module').then( m => m.ChangeProfilePicPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./pages/settings/language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'google-maps',
    loadChildren: () => import('./pages/maps/google-maps/google-maps.module').then( m => m.GoogleMapsPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/admin/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./pages/admin/delete/delete.module').then( m => m.DeletePageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/admin/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/admin/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./pages/admin/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'admin-page',
    loadChildren: () => import('./pages/admin/admin-page/admin-page.module').then( m => m.AdminPagePageModule)
  },
  {
    path: 'list-student-trip',
    loadChildren: () => import('./pages/trip/list-student-trip/list-student-trip.module').then( m => m.ListStudentTripPageModule)
  },  {
    path: 'list-partner-trip',
    loadChildren: () => import('./pages/trip/list-partner-trip/list-partner-trip.module').then( m => m.ListPartnerTripPageModule)
  },
  {
    path: 'ask-trip',
    loadChildren: () => import('./pages/trip/ask-trip/ask-trip.module').then( m => m.AskTripPageModule)
  },
  {
    path: 'start-trip',
    loadChildren: () => import('./pages/trip/start-trip/start-trip.module').then( m => m.StartTripPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
