import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articlesList: Article[] = this.articleService.currentArticlesList;
  allArticles = this.articleService.allArticles;

  isDetailView: boolean = true;
  isPriceAscending: boolean = false;
  isFiltered: boolean = false;

  viewButtonText: string = 'Image View';
  sortButtonText: string = 'Sort ↑';
  filterButtonText: string = 'Apply Filter';

  constructor(private articleService: ArticlesService) {

  }

  ngOnInit(): void {
    this.articlesList = this.articleService.currentArticlesList;
  }

  onToggleView() {
    this.isDetailView = !this.isDetailView;
    if (this.isDetailView) {
      this.viewButtonText = 'Image View';
    }
    else {
      this.viewButtonText = 'Detail View';
    }
  }

  onSort() {
    this.isPriceAscending = !this.isPriceAscending;
    if (this.isPriceAscending) {
      this.sortPriceAscending();
    }

    else {
      this.sortPriceDescending();
    }
  }

  onToggleFilter() {
    this.isFiltered = !this.isFiltered;
    if (this.isFiltered) {
      this.articleService.FilterList(this.articlesList).subscribe(a => {
        this.articlesList = a;
        this.filterButtonText = 'Remove Filter';
      });;
    }
    else {
      this.articlesList = this.allArticles;
      this.filterButtonText = 'Apply Filter';
    }
  }

  sortPriceAscending() {
    this.isPriceAscending = true;
    this.sortButtonText = 'Sort ↓';
    this.articleService.sortAscending(this.articlesList).subscribe(a => {
      this.articlesList = a;
    });
  }

  sortPriceDescending() {
    this.articleService.sortDescending(this.articlesList).subscribe(a => {
      this.articlesList = a;
    });;
    this.isPriceAscending = false;
    this.sortButtonText = 'Sort ↑';
  }



}
