import { Component, inject } from '@angular/core';
import { GitHubRepository } from '../../../../shared/models/GitHubRepository';
import { ApiService } from '../../../../core/services/api.service';
import { AngularMaterialModule } from '../../../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SnackBarUtil } from '../../../../shared/utilities/snack-bar.util';

@Component({
  selector: 'app-repository-search',
  templateUrl: './repository-search.component.html',
  styleUrl: './repository-search.component.scss',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, FormsModule, RouterModule],
})
export class RepositorySearchComponent {
  query: string = '';
  results: GitHubRepository[] = [];
  favorites: GitHubRepository[] = [];
  totalResults: number = 0;
  currentPage: number = 1;
  perPage: number = 15;

  private apiService = inject(ApiService);
  private snackBar = inject(SnackBarUtil);

  search() {
    if (!this.query) {
      this.results = [];
      return;
    }
    this.apiService.searchRepositories(this.query, this.currentPage, this.perPage).subscribe(
      (response) => {
        this.results = response.items;
        this.totalResults = response.total_count;
      },
      (error) => {
        console.error('Error fetching repositories:', error);
        this.snackBar.show('Error fetching repositories');
      }
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.search();
  }

  addToFavorites(repository: GitHubRepository) {
    if (!this.favorites.find((fav) => fav.id === repository.id)) {
      this.favorites.push(repository);

      this.apiService.addToFavorites(repository).subscribe(
        (response) => {
          this.snackBar.show('Favorite added successfully');//response
        },
        (error) => {
          this.snackBar.show('Error adding to favorites');
        }
      );
    } else {
      this.snackBar.show('This repository is already in favorites');
    }
  }

  getFavorites() {
    this.apiService.getFavorites().subscribe(
      (favorites) => {
        this.results = favorites;
      },
      (error) => {
        this.snackBar.show('Error fetching favorites');
      }
    );
  }
}
