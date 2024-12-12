import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) },
    { path: 'repository-search', loadComponent: () => import('./features/repositories/components/repository-search/repository-search.component').then(m => m.RepositorySearchComponent) },
    { path: 'favorites', loadComponent: () => import('./features/favorites/components/favorite-list/favorite-list.component').then(m => m.FavoriteListComponent) },
    { path: '**', redirectTo: '/login' },
    //TODO: add PageNotFound
];
