import { Component, OnInit } from '@angular/core';
import { dataFake } from '../../data/dataFake'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // lista completa de artigos, vinda do nosso "banco de dados fake"
  articles = dataFake;

  // termo digitado na busca
  searchTerm: string = "";

  // categoria selecionada (vazio = todas)
  selectedCategory: string = "";

  // pega as categorias únicas pra montar os botões de filtro
  categories = [...new Set(dataFake.map(article => article.category))];

  constructor() { }

  ngOnInit(): void {
  }

  // aplica busca + categoria juntas
  get filteredArticles() {
    return this.articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === "" || article.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  get mainArticle() {
    return this.filteredArticles[0];
  }

  get otherArticles() {
    return this.filteredArticles.slice(1);
  }

  filterByCategory(category: string) {
    // clicar de novo na mesma categoria remove o filtro
    this.selectedCategory = this.selectedCategory === category ? "" : category;
  }

}