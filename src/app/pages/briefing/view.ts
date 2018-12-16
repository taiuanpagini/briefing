/*--------------
V 1.0.0 - Criado por Larner Diogo

DESCIÇÃO:
Component Clientes da aplicação


COMPONENTS
***********************************************************/
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**********************************************************
SERVICES
***********************************************************/
import { GlobalService } from '../../globals/global';
import { HttpService } from '../../globals/http';
import { AlertService } from '../../globals/alert';
import { StorageService } from './../../globals/storage';
import * as jsPDF from 'jspdf';

declare var $: any;
@Component({
  selector: 'app-briefing-view',
  templateUrl: './view.html'
})
export class BriefingViewComponent implements OnInit {

  itemCarregado: any = null;
  itens: any;
  headers: any;
  model: any;
  dadosUser: any;

  constructor(
    private Router: Router,
    public GlobalService: GlobalService,
    public HttpService: HttpService,
    public AlertService: AlertService,
    public StorageService: StorageService,
    public ActivatedRoute: ActivatedRoute
  ) {
  }

  /************
  GET CLIENTE
  *************/
  getItem() {
    this.ActivatedRoute.params.subscribe(params => {

      
      // this.HttpService.JSON_GET(`/data/item/briefing/${params.id}/*/titulo`, headerConfig)
      let headerConfig = {
        stsValue: "A",
        deleteValue: "N"
      }
      this.HttpService.JSON_GET(`/data/item/briefing/${params.id}/*/*/*/S`, false)
        .then(
        (res) => {

          // console.log(res.json());
          this.AlertService.alertLoadingClose();
          if (res.json().length === 0) {
            this.GlobalService.notItens = true;
          } else {            
            this.itemCarregado = res.json().data;
            console.log(this.itemCarregado);
            setTimeout(() => {
              $('.selectpicker').selectpicker('refresh');
            }, 150);            
          }
        },
        (error) => {
          this.GlobalService.notItens = true;
          this.AlertService.alertError(JSON.parse(error._body));
        })
    })
  }

  tipoBriefing() {
    if(this.itemCarregado.digital == 1) {
      return "Digital"
    } else if(this.itemCarregado.imp_simples == 1) {
      return "Impresso Simples"
    } else if(this.itemCarregado.imp_institucional == 1) {
      return "Impresso Institucional"
    } else if(this.itemCarregado.video == 1) {
      return "Vídeo"
    } else if(this.itemCarregado.imagem == 1) {
      return "Imagem"
    } else if(this.itemCarregado.midia == 1) {
      return "Mídia Out of Home"
    }
  }

  @ViewChild('content') content: ElementRef;
  public downloadPDF() {
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, rederer) {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15);

    doc.save(this.itemCarregado.id+'_'+this.itemCarregado.titulo+'_'+this.itemCarregado.nome_usuario+'.pdf');

    // doc.text(content.innerHTML, 10, 10);
    // doc.output("dataurlnewwindow");
  }

  ngOnInit() {
    this.GlobalService.setTituloPage();

    //DADOS USUÁRIO SESSÃO
    this.getItem();
    return this.dadosUser = JSON.parse(this.StorageService.getItem('dataUser'));
  }

}
