import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { RouterModule } from '@angular/router';
import { GitHubRepository } from '../../../../shared/models/GitHubRepository';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarUtil } from '../../../../shared/utilities/snack-bar.util';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, FormsModule, RouterModule],
})
export class FavoriteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'stargazers_count', 'html_url'];
  dataSource = new MatTableDataSource<GitHubRepository>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  private apiService = inject(ApiService);
  private snackBar = inject(SnackBarUtil);

  ngOnInit() {
    this.fetchFavorites();
  }

  fetchFavorites(): void {
    this.apiService.getFavorites().subscribe({
      next: (data) => {
        this.dataSource.data = data;

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        this.snackBar.show('Favorites loaded successfully!');
      },

      error: (err) => {
        this.snackBar.show('Error fetching favorites', SnackBarUtil.Duration.LONG);
        console.error('Error fetching favorites', err)
      },
    });
  }
}
