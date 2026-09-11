import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {dataFake} from '../../data/dataFake'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  photoCover:string = ""
  contentTitle:string = ""
  contentDescription:string = ""
  contentViews:number = 0
  private id:string | null = "0"

  // campos do formulário de comentário
  nomeComentario: string = "";
  textoComentario: string = "";

  // lista de comentários feitos nesse post (fica só na memória por enquanto)
  comentarios: { nome: string, texto: string }[] = [];

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
     this.id = value.get("id")
    )

    this.setValuesToComponent(this.id)
    this.incrementViews(this.id)
  }

  setValuesToComponent(id:string | null){
    const result = dataFake.filter(article => article.id == id)[0]

    this.contentTitle = result.title
    this.contentDescription = result.description
    this.photoCover = result.photoCover
  }

  incrementViews(id: string | null){
    const chaveStorage = "views_" + id;
    const viewsSalvas = localStorage.getItem(chaveStorage);
    const totalViews = viewsSalvas ? parseInt(viewsSalvas) + 1 : 1;

    localStorage.setItem(chaveStorage, totalViews.toString());
    this.contentViews = totalViews;
  }

  // adiciona o comentário na lista e limpa os campos
  enviarComentario(){
    if(this.nomeComentario.trim() === "" || this.textoComentario.trim() === ""){
      return;
    }

    this.comentarios.push({
      nome: this.nomeComentario,
      texto: this.textoComentario
    });

    this.nomeComentario = "";
    this.textoComentario = "";
  }

}