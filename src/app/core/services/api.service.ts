import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GitHubRepository, GitHubSearchResult } from '../../shared/models/GitHubRepository';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.SERVER_BASE_API_URL; 

  private http = inject(HttpClient);

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}Auth/login`, { username, password });
  }

  searchRepositories(query: string, page: number, perPage: number): Observable<GitHubSearchResult> {
    const url = `${this.baseUrl}Repositories/SearchRepositories?query=${query}&page=${page}&per_page=${perPage}`;//TODO: CHANGE TO search/repositories
    return this.http.get<GitHubSearchResult>(url);
  }

  addToBookmarkes(favorite: GitHubRepository): Observable<GitHubRepository> {
    return this.http.post<GitHubRepository>(`${this.baseUrl}Favorite/AddToBookmark`, favorite);
  }

  getBookmarkes(): Observable<GitHubRepository[]> {
    return this.http.get<GitHubRepository[]>(`${this.baseUrl}Favorite/GetBookmarkes`);
  }

  deleteBookmark(favoriteId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Favorite/DeleteBookmark/${favoriteId}`);
  }
}
