import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { SnackBarUtil } from '../../shared/utilities/snack-bar.util';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenString = localStorage.getItem('auth_token'); 
  let accessToken: string | null = null;
  const snackBar = inject(SnackBarUtil); 

  if (tokenString) {
    try {
      const tokenObject = JSON.parse(tokenString); 
      accessToken = tokenObject.token;
    } catch (error) {
      console.error('Failed to parse token:', error);
    }
  }

  if (accessToken) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
    return next(authReq);
  }
    
  snackBar.show('No token found, sending request without Authorization header')
  return next(req);
};


