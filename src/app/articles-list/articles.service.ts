import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  baseUrl : string = 'https://localhost:7025/api/Flaschenpost/';

  allArticles: Article[] = [];
  currentArticlesList: Article[] = [];

  constructor(private http: HttpClient) {
    this.getArticles();
    this.currentArticlesList = this.allArticles;
  };

  getArticles() {
    return this.http
      .get<Article[]>('https://localhost:7025/api/Flaschenpost/getArticles')
      .subscribe(articles => {
        articles.forEach(article => {
          this.allArticles.push(article);
        })
      })
  }

  sortAscending(articles) {
    return this.http.post<Article[]>(this.baseUrl + 'sortAsc', articles);
  }

  sortDescending(articles) {
    return this.http.post<Article[]>(this.baseUrl + 'sortDesc', articles);
  } 

  FilterList(articles) {
    return this.http.post<Article[]>(this.baseUrl + 'filteredList', articles);
  }

  
}
